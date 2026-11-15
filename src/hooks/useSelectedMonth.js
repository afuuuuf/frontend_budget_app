import { useSearchParams } from "react-router-dom";
import {
  getCurrentMonth,
  parseMonthValue,
  toMonthValue,
} from "@/utils/timeUtil";

// The selected month lives in the URL (?month=2026-10), so it survives a refresh and can be shared.
export function useSelectedMonth() {
  const [searchParams, setSearchParams] = useSearchParams();

  const current = getCurrentMonth();
  const { year, month } = parseMonthValue(searchParams.get("month")) ?? current;
  const monthValue = toMonthValue(year, month);

  const setMonthValue = (value) => {
    const isCurrent = value === toMonthValue(current.year, current.month);
    setSearchParams(isCurrent ? {} : { month: value }, { replace: true });
  };

  return { year, month, monthValue, setMonthValue };
}
