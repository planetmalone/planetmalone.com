import { motion } from '../stores/motion';

/**
 * Runs `change` inside a same-document view transition when motion is on and
 * the browser supports it; otherwise runs it immediately. `className` is set on
 * <html> for the duration, so CSS can target one kind of transition.
 */
export function withViewTransition(change: () => void, className?: string) {
  if (!motion.get() || !document.startViewTransition) {
    change();
    return null;
  }
  const root = document.documentElement;
  if (className) root.classList.add(className);
  const vt = document.startViewTransition(change);
  vt.finished.finally(() => className && root.classList.remove(className));
  return vt;
}
