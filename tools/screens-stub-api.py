"""A read-only stand-in for the Audel backend, so the app can be launched and
screenshotted without touching the real server or its database."""
import json, re
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse

MONTH = "2026-09"
TODAY = "2026-09-13"

def day(n): return f"2026-09-{n:02d}"

PROFILE = {"id": "u_1", "display_name": "Caleb Shim", "email": "caleb@example.com",
           "initial": "C", "member_since": "2026-02-04", "timezone": "America/Los_Angeles"}

ACCOUNTS = [
    {"id": 1, "item_id": 1, "plaid_account_id": "a1", "name": "Everyday Checking",
     "persistent_account_id": "p1", "official_name": "Total Checking", "type": "depository",
     "subtype": "checking", "mask": "2841", "current_balance": 4182.55,
     "available_balance": 4182.55, "currency": "USD"},
    {"id": 2, "item_id": 1, "plaid_account_id": "a2", "name": "High-Yield Savings",
     "persistent_account_id": "p2", "official_name": "Online Savings", "type": "depository",
     "subtype": "savings", "mask": "9930", "current_balance": 7800.0,
     "available_balance": 7800.0, "currency": "USD"},
    {"id": 3, "item_id": 1, "plaid_account_id": "a3", "name": "Sapphire Card",
     "persistent_account_id": "p3", "official_name": "Sapphire Preferred", "type": "credit",
     "subtype": "credit card", "mask": "4417", "current_balance": 812.40,
     "available_balance": 9187.60, "currency": "USD"},
]

def txn(i, d, name, amount, cat, merchant=None, budgeted=True, manual=False, rec=None):
    return {"id": i, "account_id": 1, "date": d, "name": name, "merchant_name": merchant or name,
            "amount": amount, "category": cat, "user_category": None, "effective_category": cat,
            "pending": False, "is_manual": manual, "reimburses_transaction_id": None,
            "reimbursement_category": None, "is_budgeted": budgeted,
            "recurring_series_id": rec, "recurring_status": "confirmed" if rec else None,
            "planning_treatment": "commitment" if rec else None}

TRANSACTIONS = [
    txn(101, day(12), "Whole Foods Market", 84.20, "GROCERIES"),
    txn(102, day(12), "Blue Bottle Coffee", 6.50, "DINING", budgeted=False),
    txn(103, day(11), "Uber", 18.40, "TRANSPORTATION"),
    txn(104, day(11), "Spotify", 11.99, "SUBSCRIPTIONS", rec=7),
    txn(105, day(10), "Acme Corp Payroll", -3200.00, "INCOME"),
    txn(106, day(9), "Trader Joe's", 62.18, "GROCERIES"),
    txn(107, day(8), "Sushi Nakamura", 88.00, "DINING"),
    txn(108, day(7), "Shell", 46.10, "TRANSPORTATION"),
    txn(109, day(5), "Amazon", 129.94, "SHOPPING", budgeted=False),
    txn(110, day(3), "Equinox", 215.00, "FITNESS", rec=9),
    txn(111, day(1), "Rent", 1850.00, "RENT", rec=1),
    txn(112, day(1), "Pacific Gas & Electric", 96.42, "UTILITIES", rec=3),
]

BUDGETS = [
    {"id": 1, "category": "GROCERIES", "monthly_limit": 600.0, "period": "monthly"},
    {"id": 2, "category": "DINING", "monthly_limit": 300.0, "period": "monthly"},
    {"id": 3, "category": "TRANSPORTATION", "monthly_limit": 220.0, "period": "monthly"},
    {"id": 4, "category": "SHOPPING", "monthly_limit": 250.0, "period": "monthly"},
]

def bp(bid, cat, limit, spent, period="monthly"):
    return {"budget_id": bid, "category": cat, "period": period,
            "window_start": f"{MONTH}-01", "window_end": f"{MONTH}-30",
            "limit": limit, "spent": spent, "remaining": limit - spent,
            "pct": round(spent / limit * 100, 1)}

BUDGET_PROGRESS = [
    bp(1, "GROCERIES", 600.0, 360.38),
    bp(2, "DINING", 300.0, 340.00),
    bp(3, "TRANSPORTATION", 220.0, 64.50),
    bp(4, "SHOPPING", 250.0, 129.94),
]

SPENDING = [
    {"category": "RENT", "total": 1850.0},
    {"category": "GROCERIES", "total": 360.38},
    {"category": "DINING", "total": 340.0},
    {"category": "FITNESS", "total": 215.0},
    {"category": "SHOPPING", "total": 129.94},
    {"category": "UTILITIES", "total": 96.42},
    {"category": "TRANSPORTATION", "total": 64.5},
]

TREND = [
    {"month": "2026-04", "income": 6400.0, "expense": 4870.0},
    {"month": "2026-05", "income": 6400.0, "expense": 5120.0},
    {"month": "2026-06", "income": 6850.0, "expense": 4610.0},
    {"month": "2026-07", "income": 6400.0, "expense": 5340.0},
    {"month": "2026-08", "income": 6400.0, "expense": 4980.0},
    {"month": "2026-09", "income": 3200.0, "expense": 3056.24},
]

def pace():
    out, run = [], 0.0
    for i in range(31):
        if i < 13: run += [0, 0, 96, 215, 0, 130, 46, 88, 62, 0, 30, 0, 91][i]
        out.append(round(run, 2))
    return out

SUMMARY = {
    "spending_by_category": SPENDING,
    "income_total": 3200.0, "expense_total": 3056.24, "net": 143.76,
    "monthly_trend": TREND, "budget_progress": BUDGET_PROGRESS,
    "complete_months": ["2026-04", "2026-05", "2026-06", "2026-07", "2026-08"],
    "flexible_pace": [{"month": MONTH, "cumulative": pace()},
                      {"month": "2026-08", "cumulative": pace()}],
    "category_spend_by_month": {MONTH: SPENDING, "2026-08": SPENDING},
}

AVAILABILITY = {
    "planned_income": 6400.0, "income_basis": "recurring",
    "actual_income": 3200.0, "expected_recurring_income": 6400.0,
    "reserved_commitments": 2172.41, "actual_commitment_spend": 2172.41,
    "flexible_spent": 883.83, "flexible_plan": 1370.0,
    "available": 2480.0, "potential_extra": 620.0,
}

PLAN = {"expected_income": 6400.0, "commitments": 2172.41,
        "flexible_plan": 1370.0, "unallocated": 620.0, "suggestions_to_review": 2}

def hist(vals, start=1):
    return [{"value": v, "at": f"2026-09-{start+i:02d}T18:00:00Z", "day": day(start + i)}
            for i, v in enumerate(vals)]

def goal(gid, name, kind, unit, target, current, pct, status, icon, color,
         deadline=None, linked=None, period="monthly", direction="up",
         important=False, days=None, streak=None, milestones=None, record="goal"):
    return {
        "id": gid, "name": name, "kind": kind, "period": period, "direction": direction,
        "tracking_mode": "value", "step": 1.0, "progress_mode": "total",
        "rolling_window": 7, "average_sample_count": 3, "target": target,
        "account_id": None, "category": None, "current": current, "anchor_value": None,
        "account_ids": None, "financial_metric": None, "financial_rule": None,
        "financial_source": None, "since": "2026-06-01", "deadline": deadline,
        "group": None, "weekly_day": None, "reminder_time": None, "weekly_days": [],
        "repeat_until_completed": False, "nudge_interval_minutes": None,
        "important": important, "reset_time": "00:00", "weekly_reset_day": "monday",
        "monthly_reset_day": 1, "interval_days": None, "current_value": current,
        "pct": pct, "status": status, "unit": unit, "linked_label": linked,
        "days": days, "best_days": days, "weekly_streak": streak,
        "history": hist([current * 0.6, current * 0.8, current]),
        "milestones": milestones or [], "checklist_completed": None,
        "checklist_total": None, "contributions": None, "archived_at": None,
        "icon": icon, "color": color, "resolved_icon": icon, "resolved_color": color,
        "group_icon": None, "group_color": None, "record_type": record,
        "supports_goal_id": None, "supporting_routines": None,
    }

GOALS = [
    goal(1, "Emergency fund", "savings", "USD", 10000.0, 7800.0, 78.0, "on_track",
         "banknote.fill", "brand", deadline="2026-12-31", linked="High-Yield Savings",
         important=True, milestones=hist([2500.0, 5000.0, 7500.0])),
    goal(2, "Protein", "nutrition", "g", 140.0, 128.0, 91.4, "on_track",
         "fork.knife", "honey", period="daily", linked="Nutrition", important=True),
    goal(3, "Gym visits", "routine", "visits", 4.0, 3.0, 75.0, "on_track",
         "figure.strengthtraining.traditional", "slate", period="weekly",
         linked="Location", days=3, streak=5, record="routine"),
    goal(4, "Weekly run", "fitness", "mi", 20.0, 14.0, 70.0, "on_track",
         "figure.run", "wine", period="weekly", linked="Apple Health", days=3, streak=2),
    goal(5, "Screen time", "limit", "hr", 3.0, 3.6, 120.0, "over",
         "iphone", "copper", period="daily", direction="under"),
]

def item(n, source, sid, title, d, time, completed, important=False, missed=False,
         notes=None, end=None, loc=None):
    return {"id": f"{source}-{sid}-{d}", "source": source, "source_id": sid,
            "title": title, "scheduled_for": d, "reminder_time": time,
            "completed": completed, "missed": missed, "notes": notes,
            "period": "daily" if source == "goal" else None,
            "repeat_until_completed": False, "nudge_interval_minutes": None,
            "important": important, "repeat_rule": "none", "end_time": end, "location": loc}

SCHEDULE = [
    item(1, "goal", 4, "Morning run", TODAY, "07:00", True),
    item(2, "goal", 2, "Log breakfast", TODAY, "08:30", True),
    item(3, "event", 11, "Lunch with Sam", TODAY, "12:30", False, end="13:30", loc="Nopa"),
    item(4, "goal", 3, "Gym", TODAY, "18:00", False, important=True),
    item(5, "reminder", 21, "Reconcile spending", TODAY, "21:00", False),
    item(6, "goal", 4, "Morning run", day(12), "07:00", True),
    item(7, "goal", 2, "Log breakfast", day(12), "08:30", True),
    item(8, "goal", 3, "Gym", day(12), "18:00", True),
    item(9, "goal", 4, "Morning run", day(11), "07:00", True),
    item(10, "goal", 2, "Log breakfast", day(11), "08:30", True),
    item(11, "event", 12, "Dentist", day(15), "09:15", False, end="10:00"),
    item(12, "goal", 4, "Morning run", day(14), "07:00", False),
]

CHAT = {"conversation_id": "c_1", "messages": [
    {"role": "user", "content": "How much have I spent on dining this month?"},
    {"role": "assistant",
     "content": "$340 on dining against a $300 budget — you're $40 over with 17 days to go.",
     "actions": ["Checked 38 transactions"]},
]}

ALLOWANCE = {"plan": "beta", "used": 34, "limit": 200, "remaining": 166,
             "resets_at": "2026-10-01T00:00:00Z", "period": "monthly"}

ROUTES = {
    "auth/profile": PROFILE,
    "accounts": ACCOUNTS,
    "transactions": TRANSACTIONS,
    "dashboard/summary": SUMMARY,
    "budgets": BUDGETS,
    "plan/availability": AVAILABILITY,
    "plan/summary": PLAN,
    "goals": GOALS,
    "goals/vocabulary": {"terms": [g["name"] for g in GOALS]},
    "schedule": SCHEDULE,
    "assistant/history": CHAT,
    "assistant/allowance": ALLOWANCE,
    "integrations/bindings": [],
    "integrations/goal-source-catalog": [],
    "recurring-series": [
        {"id": 1, "account_id": 1, "name": "Rent", "direction": "outflow", "cadence": "monthly",
         "expected_amount": 1850.0, "monthly_amount": 1850.0, "category": "RENT",
         "next_expected_date": "2026-10-01", "last_observed_at": day(1),
         "planning_treatment": "commitment", "status": "confirmed", "transaction_count": 8},
        {"id": 3, "account_id": 1, "name": "Pacific Gas & Electric", "direction": "outflow",
         "cadence": "monthly", "expected_amount": 96.42, "monthly_amount": 96.42,
         "category": "UTILITIES", "next_expected_date": "2026-10-01",
         "last_observed_at": day(1), "planning_treatment": "commitment",
         "status": "confirmed", "transaction_count": 8},
        {"id": 9, "account_id": 1, "name": "Equinox", "direction": "outflow",
         "cadence": "monthly", "expected_amount": 215.0, "monthly_amount": 215.0,
         "category": "FITNESS", "next_expected_date": "2026-10-03",
         "last_observed_at": day(3), "planning_treatment": "commitment",
         "status": "confirmed", "transaction_count": 6},
    ],
    "portfolio": {"environment": "sandbox", "accounts": []},
}


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def do_GET(self):
        path = urlparse(self.path).path
        key = re.sub(r"^/api/", "", path).strip("/")
        body = ROUTES.get(key)
        if body is None:
            # Unknown reads are empty rather than errors, so one missing
            # endpoint cannot blank a whole screen.
            body = [] if not key.count("/") else {}
        payload = json.dumps(body).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def do_POST(self):
        self.do_GET()

    do_PUT = do_POST
    do_DELETE = do_GET


if __name__ == "__main__":
    HTTPServer(("127.0.0.1", 8199), Handler).serve_forever()
