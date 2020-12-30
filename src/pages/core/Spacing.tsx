import { css } from "@emotion/css";
import { useTheme } from "@material-ui/core";

/**
 * No component should have styles to distance themselves from other
 * components. This component builds that mindset into code.
 */
type Props = {
  s1?: boolean;
  s2?: boolean;
  s3?: boolean;
  s4?: boolean;
  s8?: boolean;
  s16?: boolean;
  grow?: boolean;
};
export function VerticalSpace({ grow = false, ...spacingProps }: Props) {
  const theme = useTheme();
  return (
    <div
      className={css({
        height: theme.spacing(spacing(spacingProps)),
        flexGrow: grow ? 1 : "initial",
        flexShrink: 0,
      })}
    />
  );
}
export function HorizontalSpace({ grow = false, ...spacingProps }: Props) {
  const theme = useTheme();
  return (
    <span
      className={css({
        width: theme.spacing(spacing(spacingProps)),
        flexGrow: grow ? 1 : "initial",
        flexShrink: 0,
      })}
    />
  );
}
function spacing({ s1, s2, s3, s4, s8, s16 }: Props) {
  return (
    (s1 ? 1 : undefined) ??
    (s2 ? 2 : undefined) ??
    (s3 ? 3 : undefined) ??
    (s4 ? 4 : undefined) ??
    (s8 ? 8 : undefined) ??
    (s16 ? 16 : undefined) ??
    1
  );
}
