import * as React from "react";
import { useUID } from "react-uid";

type Values = { [path: string]: string | number | boolean };

type Keys<V extends Values> = keyof V & string;

type Ids<V extends Values> = { [P in Keys<V>]: string };

type Errors<V extends Values> = Partial<{ [P in Keys<V>]: string | null | undefined }>;

type State<V extends Values> = { values: V; errors?: Errors<V> };

const toState = <V extends Values>(defaults: V): State<V> => ({
  values: defaults,
});

type Action<V extends Values> =
  | { type: "SET_VALUES"; values: Partial<V> }
  | { type: "SET_ERRORS"; errors: Partial<Errors<V>> };

const reducer = <V extends Values>(prevState: State<V>, action: Action<V>): State<V> => {
  switch (action.type) {
    case "SET_VALUES":
      return { ...prevState, values: { ...prevState.values, ...action.values } };
    case "SET_ERRORS":
      return { ...prevState, errors: { ...prevState.errors, ...action.errors } };
    default:
      return prevState;
  }
};

const toIds = <V extends Values>(prefix: string, defaults: V): Ids<V> => {
  const out: any = {};
  for (const name of Object.keys(defaults)) {
    out[name] = `${prefix}-${name}`;
  }
  return out;
};

export default function useForm<V extends Values>({
  defaults,
  validate = () => ({}),
  /* eslint-disable-next-line @typescript-eslint/require-await */
  onSubmit = async e => {
    e.preventDefault();
    return {};
  },
}: {
  defaults: V;
  validate: (values: V) => Errors<V>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, values: V) => Promise<Errors<V>>;
}): {
  ids: Ids<V>;
  values: V;
  errors: Errors<V>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
} {
  const prefix = useUID();
  const ids = React.useMemo<Ids<V>>(() => toIds(prefix, defaults), [prefix, defaults]);
  const [state, dispatch] = React.useReducer<React.Reducer<State<V>, Action<V>>>(
    reducer,
    toState<V>(defaults),
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({
      type: "SET_VALUES",
      values: { [e.currentTarget.name]: e.currentTarget.value } as Partial<V>,
    });
    dispatch({
      type: "SET_ERRORS",
      errors: validate(state.values),
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    onSubmit(e, state.values)
      .then((errors: Errors<V> = {}) => {
        dispatch({ type: "SET_ERRORS", errors });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  return {
    ids,
    values: state.values,
    errors: state.errors || {},
    handleChange,
    handleSubmit,
    isSubmitting,
  };
}
