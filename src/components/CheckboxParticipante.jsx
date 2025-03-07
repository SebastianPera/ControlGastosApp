export const CheckboxParticipante = ({
  participante,
  checked,
  onChange,
  disabled,
}) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      id={`checkbox-${participante}`}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className="mr-2"
    />
    <label htmlFor={`checkbox-${participante}`}>{participante}</label>
  </div>
);
