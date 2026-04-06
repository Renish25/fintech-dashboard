import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X } from 'lucide-react'
import { format } from 'date-fns'
import { CATEGORIES } from '../../data/mockData'
import { addTransaction, updateTransaction } from '../../store/slices/transactionsSlice'
import { closeModal, selectModal, selectModalData } from '../../store/slices/uiSlice'
import clsx from 'clsx'

const EMPTY_FORM = {
  description: '',
  amount:      '',
  category:    'food',
  type:        'expense',
  date:        format(new Date(), 'yyyy-MM-dd'),
}

export default function TransactionModal() {
  const dispatch  = useDispatch()
  const modal     = useSelector(selectModal)
  const modalData = useSelector(selectModalData)
  const isEdit    = modal === 'edit'

  const [form, setForm]     = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isEdit && modalData) {
      setForm({
        description: modalData.description,
        amount:      String(modalData.amount),
        category:    modalData.category,
        type:        modalData.type,
        date:        modalData.date,
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setErrors({})
  }, [modal, modalData, isEdit])

  if (!modal) return null

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.description.trim()) e.description = 'Description is required'
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = 'Enter a valid amount'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    const txn = { ...form, amount: parseFloat(form.amount) }

    if (isEdit) {
      dispatch(updateTransaction({ id: modalData.id, updates: txn }))
    } else {
      dispatch(addTransaction({ id: `txn_${Date.now()}`, ...txn }))
    }
    dispatch(closeModal())
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={() => dispatch(closeModal())}
      />

      {/* Panel */}
      <div className="relative card w-full max-w-md p-6 animate-fade-up shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-lg">
            {isEdit ? 'Edit Transaction' : 'New Transaction'}
          </h2>
          <button
            onClick={() => dispatch(closeModal())}
            className="btn-ghost p-1.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Type toggle */}
          <div>
            <label className="text-gray-500 dark:text-white/50 text-xs font-mono mb-2 block">TYPE</label>
            <div className="flex gap-2">
              {['expense', 'income'].map((t) => (
                <button
                  key={t}
                  onClick={() => set('type', t)}
                  className={clsx(
                    'flex-1 py-2 rounded-xl text-sm border transition-all',
                    form.type === t
                      ? t === 'income'
                        ? 'bg-jade-500/20 border-jade-500 text-jade-400'
                        : 'bg-crimson-500/20 border-crimson-500 text-crimson-400'
                      : 'bg-transparent border-obsidian-500 dark:text-white/40 dark:hover:text-white/70 text-gray-400 hover:text-gray-600',
                  )}
                >
                  {t === 'income' ? '↑ Income' : '↓ Expense'}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-500 dark:text-white/50 text-xs font-mono mb-2 block">DESCRIPTION</label>
            <input
              className={clsx('input w-full', errors.description && 'border-crimson-500')}
              placeholder="e.g. Grocery Shopping"
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
            {errors.description && (
              <p className="text-crimson-400 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="text-gray-500 dark:text-white/50 text-xs font-mono mb-2 block">AMOUNT (₹)</label>
            <input
              className={clsx('input w-full font-mono', errors.amount && 'border-crimson-500')}
              type="number"
              min="0"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => set('amount', e.target.value)}
            />
            {errors.amount && (
              <p className="text-crimson-400 text-xs mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="text-gray-500 dark:text-white/50 text-xs font-mono mb-2 block">CATEGORY</label>
            <select
              className="input w-full"
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
            >
              {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
                <option key={key} value={key}>{icon} {label}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="text-gray-500 dark:text-white/50 text-xs font-mono mb-2 block">DATE</label>
            <input
              className="input w-full font-mono"
              type="date"
              value={form.date}
              onChange={(e) => set('date', e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => dispatch(closeModal())}
              className="btn-ghost flex-1"
            >
              Cancel
            </button>
            <button onClick={handleSubmit} className="btn-primary flex-1">
              {isEdit ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
