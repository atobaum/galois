import { useForm } from "react-hook-form";

type useFormReturnType = ReturnType<typeof useForm>;

type EditorCompoenentInput<
  T extends keyof useFormReturnType,
  P = {}
> = React.FC<Pick<useFormReturnType, T> & P>;
