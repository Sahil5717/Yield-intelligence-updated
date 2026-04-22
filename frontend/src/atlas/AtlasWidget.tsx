import { useEffect, useRef, useState } from 'react';
import { useAtlas } from './AtlasProvider';

export function AtlasWidget() {
  const {
    thread,
    currentScreen,
    seenScreens,
    sendUserMessage,
    markScreenSeen,
  } = useAtlas();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const msgsRef = useRef<HTMLDivElement>(null);

  const screenId = currentScreen?.screen ?? 'unknown';
  const prompts = currentScreen?.prompts ?? [];
  const hasSeen = seenScreens.includes(screenId);

  // Auto-scroll thread when new messages arrive
  useEffect(() => {
    const el = msgsRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [thread, open]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 250);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
    markScreenSeen(screenId);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    sendUserMessage(text);
    setDraft('');
  };

  return (
    <>
      <button
        className={
          'atlas-bubble' +
          (hasSeen ? ' seen' : '') +
          (open ? ' open' : '')
        }
        aria-label="Open Atlas assistant"
        onClick={() => (open ? setOpen(false) : handleOpen())}
      >
        A
        {!hasSeen && !open && <span className="atlas-bubble-dot" />}
      </button>

      <div className={'atlas-panel' + (open ? ' open' : '')}>
        <div className="atlas-ph">
          <div className="atlas-ph-avatar">A</div>
          <div className="atlas-ph-meta">
            <div className="atlas-ph-name">Atlas</div>
            <div className="atlas-ph-role">Your analyst · Online</div>
          </div>
          <button
            className="atlas-ph-close"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="atlas-msgs" ref={msgsRef}>
          {thread.map((m, idx) => {
            if (m.type === 'mark') {
              return (
                <div key={idx} className="atlas-screen-mark">
                  — {m.label} —
                </div>
              );
            }
            if (m.type === 'atlas') {
              return (
                <div
                  key={idx}
                  className="atlas-msg from-atlas"
                  dangerouslySetInnerHTML={{ __html: m.text }}
                />
              );
            }
            return (
              <div key={idx} className="atlas-msg from-user">
                {m.text}
              </div>
            );
          })}
        </div>

        <div className="atlas-prompts">
          {prompts.map((p) => (
            <button
              key={p}
              className="atlas-prompt-chip"
              onClick={() => handleSend(p)}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="atlas-input">
          <div className="atlas-input-box">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask Atlas anything…"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend(draft);
              }}
            />
            <button
              className="atlas-send"
              onClick={() => handleSend(draft)}
              aria-label="Send"
            >
              ↵
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
