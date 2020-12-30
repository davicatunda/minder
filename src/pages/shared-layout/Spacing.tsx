import { Property } from "csstype";
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
  grow?: Property.FlexGrow;
};
export function VerticalSpace({ grow = "initial", ...spacingProps }: Props) {
  const theme = useTheme();
  const space = theme.spacing(spacing(spacingProps));
  return <div className={css({ height: space, flexGrow: grow, flexShrink: 0 })} />;
}
export function HorizontalSpace({ grow = "initial", ...spacingProps }: Props) {
  const theme = useTheme();
  const space = theme.spacing(spacing(spacingProps));
  return <span className={css({ width: space, flexGrow: grow, flexShrink: 0 })} />;
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
