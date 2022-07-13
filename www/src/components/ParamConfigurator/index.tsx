import React from "react";
import styles from "../../styles/ParamConfigurator.module.css";

export type ParamName = string;
export type ParamValue = number;

export type Props = {
  name: string;
  default: ParamValue;
  presets: [ParamName, ParamValue][];
  validator: (v: ParamValue) => null | string;
  onChange?: (v: ParamValue | null) => void;
};

const ParamConfigurator = (props: Props) => {
  const [selectedRadioButtonName, setSelectedRadioButtonName] = React.useState(
    props.default as string | number
  );
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    props.onChange && props.onChange(props.default)
  },[])

  const customValueInputRef = React.useRef<HTMLInputElement>(null);

  const onRadioButtonChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const value = e.target.value;
    const n = Number.parseFloat(value);
    if (!isNaN(n)) {
      setSelectedRadioButtonName(n);
      props.onChange && props.onChange(n);
    } else {
      setSelectedRadioButtonName("custom");

      const inputRef = customValueInputRef.current;
      if (inputRef === null) {
        return;
      }

      const n = inputRef.valueAsNumber;
      if (isNaN(n)) {
        setError("Not a Number");
      }
      const error = props.validator(n);
      if (error !== null) {
        setError(error);
        props.onChange && props.onChange(null);
      } else {
        props.onChange && props.onChange(n);
      }
    }
  };

  const onCustomValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSelectedRadioButtonName("custom");
    const v = e.target.valueAsNumber;
    const error = props.validator(v);
    if (error !== null) {
      setError(error);
      props.onChange && props.onChange(null);
    } else {
      props.onChange && props.onChange(v);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.paramName}>{props.name}</div>
      {props.presets.map(([presetName, value]) => (
        <div key={presetName}>
          <input
            type="radio"
            name={props.name}
            value={value}
            checked={selectedRadioButtonName === value}
            id={presetName}
            onChange={onRadioButtonChecked}
          />
          <label htmlFor={presetName}>{presetName}</label>
        </div>
      ))}
      <div className={styles.customInputContainer}>
        <input
          type="radio"
          name={props.name}
          value="custom"
          id="custom"
          checked={selectedRadioButtonName === "custom"}
          onChange={onRadioButtonChecked}
        />
        <input
          type="number"
          name="custom-value"
          id="custom-value"
          className={styles.customValueInput}
          onChange={onCustomValueChange}
          ref={customValueInputRef}
        />
      </div>
      {error && <div>{error}</div>}
    </div>
  );
};

export default ParamConfigurator;
