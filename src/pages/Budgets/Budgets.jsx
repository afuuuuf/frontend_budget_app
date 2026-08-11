import { useEffect, useState } from 'react';
import { FaBolt, FaCar, FaEllipsisH, FaFilm, FaShoppingBag } from 'react-icons/fa';
import { budgetTypeOptions } from '../../enums/budgetType';
import BudgetForm from '../../forms/BudgetForm/BudgetForm';
import { getBudget } from '../../services/budgetService';
import './Budgets.css';

const categoryIcons = {
    Bills: FaBolt,
    Shopping: FaShoppingBag,
    Transportation: FaCar,
    Entertainment: FaFilm,
    Others: FaEllipsisH,
};

const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });

function Budgets() {
    const [budgets, setBudgets] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchBudgets() {
            try {
                const results = await Promise.allSettled(
                    budgetTypeOptions.map((type) => getBudget(type, currentMonth))
                );

                if (cancelled) return;

                const next = {};
                results.forEach((result, index) => {
                    if (result.status === 'fulfilled') {
                        next[budgetTypeOptions[index]] = result.value.amount;
                    }
                });

                setBudgets(next);
            } catch (err) {
                console.error(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchBudgets();

        return () => {
            cancelled = true;
        };
    }, []);

    const refresh = () => {
        setLoading(true);
        setBudgets({});

        budgetTypeOptions.forEach(async (type) => {
            try {
                const res = await getBudget(type, currentMonth);
                setBudgets((prev) => ({ ...prev, [type]: res.amount }));
            } catch {
                setBudgets((prev) => ({ ...prev, [type]: undefined }));
            }
        });

        setLoading(false);
    };

    return (
        <div className="Budgets">
            <div className="budget-header">
                <h2>Monthly Budgets</h2>
                <span className="budget-month">{currentMonth}</span>
            </div>

            <div className="budget-cards">
                {budgetTypeOptions.map((category) => {
                    const Icon = categoryIcons[category] || FaEllipsisH;
                    const amount = budgets[category];

                    return (
                        <button
                            type="button"
                            className="card"
                            key={category}
                            onClick={() => setSelectedType(category)}
                        >
                            <div className="card-header">
                                <span>{category}</span>
                                <Icon className={`icon ${category.toLowerCase()}`} />
                            </div>
                            <p className={`value ${category.toLowerCase()}`}>
                                {loading
                                    ? '...'
                                    : amount != null
                                        ? `RM${amount.toFixed(2)}`
                                        : 'Not set'}
                            </p>
                            <span className="card-action">
                                {amount != null ? 'Edit' : 'Set budget'}
                            </span>
                        </button>
                    );
                })}
            </div>

            {selectedType && (
                <BudgetForm
                    budgetType={selectedType}
                    month={currentMonth}
                    existingAmount={budgets[selectedType]}
                    onCreated={() => {
                        refresh();
                        setSelectedType(null);
                    }}
                    onClose={() => setSelectedType(null)}
                />
            )}
        </div>
    );
}

export default Budgets;
