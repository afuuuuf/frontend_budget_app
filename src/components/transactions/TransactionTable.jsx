import { TransactionTableRow } from "@/components/transactions/TransactionTableRow";

const COLUMNS = [
  { label: "Transaction" },
  { label: "Category" },
  { label: "Type" },
  { label: "Date", sortedDescending: true },
  { label: "Amount", align: "text-right" },
];

// Just the table: the page wraps it (with the filters and footer) in one card.
export function TransactionTable({ transactions, monthValue }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left">
        <thead className="bg-ivory text-xs text-slate">
          <tr>
            {COLUMNS.map(({ label, align = "", sortedDescending }) => (
              <th
                key={label}
                scope="col"
                aria-sort={sortedDescending ? "descending" : undefined}
                className={`px-6 py-3 font-normal ${align}`}
              >
                {label}
                {sortedDescending && <span aria-hidden="true"> ↓</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <TransactionTableRow
              key={transaction.id}
              transaction={transaction}
              monthValue={monthValue}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
