export interface IButton {
  img: string;
  style: Record<string, string>;
  href?: string;
  callback?: (e: MouseEvent) => void;
}