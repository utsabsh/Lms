import { Button } from "../ui/button";
import FormControls from "./form-controls";

function CommonForm({ handleSubmit, buttonText, formControls = [] }) {
  return (
    <form onSubmit={handleSubmit}>
      {/* render form controls here */}
      <FormControls
        formControls={formControls}
        // formData={formData}
        // setFormData={setFormData}
      />
      <Button type="submit" className="mt-5 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
