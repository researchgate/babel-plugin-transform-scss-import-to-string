import sideEffectStyles from './sample.scss';

if (typeof sideEffectStyles === 'string') {
  const style = document.createElement('style');
  style.styleSheet.cssText = sideEffectStyles;
  document.head.appendChild(style);
}
