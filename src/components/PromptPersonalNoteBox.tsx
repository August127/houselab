import React, { useState, useEffect } from 'react';
import { StickyNote, Check, Pencil, Trash2 } from 'lucide-react';

interface PromptPersonalNoteBoxProps {
  promptId: string;
  note: string;
  onChangeNote: (promptId: string, nextNote: string) => void;
  compact?: boolean;
}

export const PromptPersonalNoteBox: React.FC<PromptPersonalNoteBoxProps> = ({
  promptId,
  note,
  onChangeNote,
  compact = false,
}) => {
  const hasSavedNote = note.trim().length > 0;
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(note);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    setDraft(note);
  }, [note]);

  const handleSave = (e?: React.MouseEvent | React.FormEvent) => {
    if (e) e.stopPropagation();
    onChangeNote(promptId, draft.trim());
    setIsEditing(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1800);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDraft('');
    onChangeNote(promptId, '');
    setIsEditing(false);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        if (isEditing) {
          e.stopPropagation();
          if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
            e.preventDefault();
            handleSave();
          }
        }
      }}
      className={`mt-2.5 rounded-xl border transition-colors ${
        hasSavedNote || isEditing
          ? 'border-amber-300/80 dark:border-amber-700/60 bg-amber-50/75 dark:bg-amber-950/25 p-2'
          : 'border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 px-2.5 py-1.5 hover:border-emerald-400/80'
      }`}
    >
      {!isEditing && !hasSavedNote && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          className="w-full flex items-center justify-between gap-2 text-left text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 cursor-pointer"
        >
          <span className="inline-flex items-center gap-1.5 truncate">
            <StickyNote className="w-3 h-3 text-amber-500 shrink-0" />
            <span className="truncate">+ Ghi chú cá nhân / biến thể riêng</span>
          </span>
          <span className="text-[10px] text-slate-400 shrink-0">Thêm</span>
        </button>
      )}

      {!isEditing && hasSavedNote && (
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 dark:text-amber-300">
              <StickyNote className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Ghi chú riêng</span>
              {justSaved && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 ml-1">
                  <Check className="w-3 h-3" /> Đã lưu
                </span>
              )}
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                title="Chỉnh sửa ghi chú"
                className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-amber-200/60 dark:hover:bg-slate-800 cursor-pointer"
              >
                <Pencil className="w-2.5 h-2.5" />
                <span>Sửa</span>
              </button>
              <button
                type="button"
                onClick={handleClear}
                title="Xóa ghi chú"
                className="inline-flex items-center rounded-md p-0.5 text-slate-400 hover:text-rose-600 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          <p
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className={`text-[11px] text-amber-950 dark:text-amber-100/90 leading-snug whitespace-pre-wrap cursor-text ${
              compact ? 'line-clamp-1' : 'line-clamp-2'
            }`}
          >
            {note}
          </p>
        </div>
      )}

      {isEditing && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <label
              htmlFor={`note-input-${promptId}`}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 dark:text-amber-300"
            >
              <StickyNote className="w-3 h-3 text-amber-600 shrink-0" />
              <span>Ghi chú cá nhân</span>
            </label>
            <span className="text-[10px] text-slate-400">Tự động lưu</span>
          </div>

          <textarea
            id={`note-input-${promptId}`}
            rows={2}
            autoFocus
            value={draft}
            onChange={(e) => {
              const nextVal = e.target.value;
              setDraft(nextVal);
              onChangeNote(promptId, nextVal);
            }}
            placeholder="Nhập biến thể câu lệnh hoặc lưu ý riêng..."
            className="w-full rounded-lg border border-amber-300 dark:border-amber-700/70 bg-white dark:bg-slate-900 px-2 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
          />

          <div className="flex items-center justify-end gap-1.5">
            {hasSavedNote && (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-md px-2 py-0.5 text-[10px] font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
              >
                Xóa
              </button>
            )}
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white hover:bg-emerald-500 cursor-pointer"
            >
              <Check className="w-2.5 h-2.5" />
              <span>Xong</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
