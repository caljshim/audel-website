# Retaking the app screens

`public/screens/*.png` are simulator captures of the real app. They are not
recreations — an HTML rebuild of a SwiftUI screen is a reimplementation in a
different text engine, and the last one drifted by up to 112pt of vertical
rhythm before it looked wrong enough to notice. Retake the captures when the
app's design changes; do not redraw them.

Everything below runs against a **stub API**, so no part of this touches the
real backend on port 8100 or its database.

## 1. Build the app

```bash
cd ~/Projects/goals-app/ios/goals-app
xcodebuild -project goals-app.xcodeproj -scheme goals-app \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro' \
  -derivedDataPath /tmp/audel-dd build
xcrun simctl boot "iPhone 17 Pro"
xcrun simctl install booted /tmp/audel-dd/Build/Products/Debug-iphonesimulator/goals-app.app
```

## 2. Serve the sample data

`tools/screens-stub-api.py` answers every endpoint `MoneyStore` reads on launch
with the figures the site shows. Edit it there if the sample data should change.

```bash
python3 tools/screens-stub-api.py    # 127.0.0.1:8199
```

## 3. Set the simulator up

```bash
xcrun simctl ui booted appearance light
xcrun simctl status_bar booted override --time "9:41" \
  --batteryState charged --batteryLevel 100 \
  --cellularMode active --cellularBars 4 \
  --wifiMode active --wifiBars 3 --dataNetwork 5g
```

## 4. Choose the screen

The app has no launch flag for its tab, and `simctl openurl` raises an
"Open in Audel?" consent dialog that nothing can dismiss — so set the stored
preference directly, then reboot the device so `cfprefsd` re-reads it.

```bash
C=$(xcrun simctl get_app_container booted calebshim.goals-app data)
P="$C/Library/Preferences/calebshim.goals-app.plist"
cp "$P" /tmp/audel-prefs-backup.plist          # put this back when you are done

xcrun simctl terminate booted calebshim.goals-app
/usr/libexec/PlistBuddy -c 'Set :money.ui.selectedTab dashboard' "$P"
# dashboard | finances | goals | routines
# and for the Finances tab:
/usr/libexec/PlistBuddy -c 'Set :money.ui.finances.section Transactions' "$P"

xcrun simctl shutdown booted && xcrun simctl boot "iPhone 17 Pro"
```

Home shows whatever widgets are stored, so set those too:

```bash
/usr/libexec/PlistBuddy -c 'Delete :money.dashboard.widgets' "$P"
/usr/libexec/PlistBuddy -c 'Add :money.dashboard.widgets array' "$P"
/usr/libexec/PlistBuddy -c 'Add :money.dashboard.widgets:0 string available-this-month' "$P"
/usr/libexec/PlistBuddy -c 'Add :money.dashboard.widgets:1 string left-to-spend' "$P"
/usr/libexec/PlistBuddy -c 'Add :money.dashboard.widgets:2 string pinned-goals' "$P"
```

The Goals tab opens with its cadence groups collapsed, which makes for a thin
screen. Expanding them needs a key containing a colon, and **PlistBuddy reads
`:` as a path separator**, so that one has to go through `plistlib`:

```bash
python3 - "$P" <<'EOF'
import plistlib, sys
with open(sys.argv[1], 'rb') as f: d = plistlib.load(f)
for k in ("daily", "weekly", "monthly"):
    d["money.ui.goalCategory.goal-section:%s.expanded" % k] = True
with open(sys.argv[1], 'wb') as f: plistlib.dump(d, f)
EOF
```

## 5. Capture

Reapply the status bar override after launch — booting clears it.

```bash
SIMCTL_CHILD_API_BASE_URL="http://127.0.0.1:8199/api" \
  xcrun simctl launch booted calebshim.goals-app
sleep 13
xcrun simctl status_bar booted override --time "9:41" ...   # again
xcrun simctl io booted screenshot /tmp/shot.png             # 1206 x 2622
```

## 6. Put it in the site

The screen is 402 x 874 points; the asset is 2x that, which is ample for a
phone drawn about 310px wide.

```bash
sips -z 1748 804 /tmp/shot.png --out public/screens/home.png
```

Then restore what you changed:

```bash
cp /tmp/audel-prefs-backup.plist "$P"
xcrun simctl status_bar booted clear
xcrun simctl shutdown booted
```
