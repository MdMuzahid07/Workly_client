/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  DefaultValues,
  FieldValues,
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { toast } from "sonner";

interface FormConfig<T extends FieldValues> {
  defaultValues?: DefaultValues<T>;
  resolver?: Resolver<T>;
  values?: T;
}
interface WkFormProps<T extends FieldValues> extends FormConfig<T> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<T>;
  values?: T;
}

const WkForm = <T extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  resolver,
  values,
}: WkFormProps<T>) => {
  const formConfig: FormConfig<T> = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  if (values) {
    formConfig["values"] = values;
  }

  const methods: UseFormReturn<T> = useForm<T>({
    defaultValues,
    resolver,
    values,
  });

  const submitHandler = methods.handleSubmit;

  const onFormSubmit = (data: T) => {
    onSubmit(data);
  };

  const onFormError = (errors: any) => {
    console.error("Form Validation Errors Detail:", {
      errors,
      fieldNames: Object.keys(errors),
      errorCount: Object.keys(errors).length,
    });

    // Check if there are any errors
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const firstErrorKey = errorKeys[0];
      const firstError = errors[firstErrorKey];

      // If it's a nested error (like skillsRequired.0.skillName)
      let message = "";
      if (firstError?.message) {
        message = firstError.message;
      } else if (typeof firstError === "object") {
        // Try to find a message deeper in the object
        const nestedValues = Object.values(firstError);
        const nestedErrorWithMessage = nestedValues.find(
          (v: any) => v?.message,
        ) as any;
        if (nestedErrorWithMessage?.message) {
          message = nestedErrorWithMessage.message;
        }
      }

      if (message) {
        toast.error(message);
      } else {
        toast.error(
          `Validation error in ${firstErrorKey}. Please check the form.`,
        );
      }
    } else {
      console.warn("onFormError called but no errors found in errors object.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler(onFormSubmit, onFormError)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default WkForm;
