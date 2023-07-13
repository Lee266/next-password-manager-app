
type AddButtonPropsType = {
  form: string|undefined,
  name: string,
  click?: () => void,
  type?: "button" | "submit" | "reset",
}

const AddButton = (props: AddButtonPropsType) => {
  return(
    <div>
      <button
        type={props.type || "button"}
        form={props.form}
        className="
        bg-blue-500 hover:bg-blue-700 
        text-white font-bold 
          py-2 px-4 rounded-full"
        onClick={props.click}
      >
        {props.name}
      </button>
    </div>
  )
}

export default AddButton;