import homeShot from "@/public/screens/home.png";
import financesShot from "@/public/screens/finances.png";
import scheduleShot from "@/public/screens/schedule.png";
import goalsShot from "@/public/screens/goals.png";
import { Phone } from "@/components/mockups/Phone";

/* ---------------------------------------------------------------------------
   The screens the page shows, captured from the app running in the simulator
   against a stub API. Sample figures, real everything else.
   ------------------------------------------------------------------------ */

export function HomeScreen() {
  return (
    <Phone
      src={homeShot}
      priority
      alt="Audel's Home screen: $2,480.00 left to spend this month with 18 days to go, the month's income, committed and budgeted figures, and flexible budgets for groceries, dining, transport and shopping — dining shown over its limit in copper."
    />
  );
}

export function FinancesScreen() {
  return (
    <Phone
      src={financesShot}
      alt="Audel's Finances tab on its Transactions section: a prompt to review two unbudgeted transactions, then a list of recent transactions with dates and categories, one flagged as having no matching budget and a paycheck shown in pine."
    />
  );
}

export function ScheduleScreen() {
  return (
    <Phone
      src={scheduleShot}
      alt="Audel's Schedule tab: the week of September 2026 with today selected, then today's list — a completed morning run and logged breakfast, lunch with Sam, the gym, and an evening reminder — followed by a weekly routine group at 75 percent."
    />
  );
}

export function GoalsScreen() {
  return (
    <Phone
      src={goalsShot}
      alt="Audel's Goals tab, grouped by cadence: a daily group at 105.7 percent in copper holding protein at 128g of 140g and screen time over its limit, a weekly group at 70 percent holding a 14-of-20-mile run, and a monthly group at 78 percent holding an emergency fund at $7,800 of $10,000."
    />
  );
}
