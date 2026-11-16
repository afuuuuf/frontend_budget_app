import { FiSearch } from "react-icons/fi";
import { ALL_CATEGORIES } from "@/constants/categories";
import { FLOW_OPTIONS } from "@/constants/transactions";
import { formatEnumLabel } from "@/utils/enumUtil";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { CategorySelect } from "@/components/ui/CategorySelect";

const CATEGORY_OPTIONS = [
  { value: "", label: "All categories" },
  ...ALL_CATEGORIES.map((value) => ({ value, label: formatEnumLabel(value) })),
];
const TYPE_OPTIONS = [{ value: "", label: "All types" }, ...FLOW_OPTIONS];

// `onChange` receives just the field that changed, like { search: "rent" }.
export function TransactionFilters({ filters, onChange }) {
  return (
    <div className="grid gap-4 p-6 md:grid-cols-[1fr_200px_180px]">
      <FormField label="Search transactions" htmlFor="transaction-search">
        <Input
          id="transaction-search"
          value={filters.search}
          onChange={(event) => onChange({ search: event.target.value })}
          placeholder="Merchant, category or description"
          autoComplete="off"
          adornment={<FiSearch aria-hidden="true" size={18} />}
        />
      </FormField>

      <FormField label="Category" htmlFor="transaction-category">
        <CategorySelect
          id="transaction-category"
          options={CATEGORY_OPTIONS}
          value={filters.category}
          onChange={(event) => onChange({ category: event.target.value })}
        />
      </FormField>

      <FormField label="Type" htmlFor="transaction-type">
        <CategorySelect
          id="transaction-type"
          options={TYPE_OPTIONS}
          value={filters.flow}
          onChange={(event) => onChange({ flow: event.target.value })}
        />
      </FormField>
    </div>
  );
}
