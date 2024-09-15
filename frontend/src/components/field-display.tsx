import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Pencil, X, Check } from "lucide-react";
import { useForm, Controller, Control } from "react-hook-form";

interface EditableSectionProps {
  label: string;
  value: string;
  isEditing: boolean;
  onEdit: (index: number) => void;
  onCancel: (index: number) => void;
  onSave: (index: number) => void;
  tempValue: string;
  onInputChange: (index: number, value: string) => void;
  index: number;
  textArea?: boolean;
  control: Control<any>;
}

const EditableSection: React.FC<EditableSectionProps> = ({
  label,
  value,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  tempValue,
  onInputChange,
  index,
  textArea,
  control,
}) => {
  return (
    <div className="grid gap-x-4 gap-y-2">
      <h3 className="text-lg font-semibold">{label}</h3>
      {isEditing ? (
        textArea ? (
          <Controller
            name={`section_${index}`}
            control={control}
            defaultValue={tempValue}
            render={({ field }) => (
              <Textarea
                rows={5}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  onInputChange(index, e.target.value);
                }}
                className="border p-2 rounded"
              />
            )}
          />
        ) : (
          <Controller
            name={`section_${index}`}
            control={control}
            defaultValue={tempValue}
            render={({ field }) => (
              <Input
                type="text"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  onInputChange(index, e.target.value);
                }}
                className="border p-2 rounded"
              />
            )}
          />
        )
      ) : (
        <p className="text-sm text-muted-foreground">{value}</p>
      )}
      {isEditing && (
        <div className="flex justify-end space-x-2">
          <Button
            className="px-3 py-1 border rounded"
            onClick={() => onCancel(index)}
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-3 py-1 bg-blue-500 text-white rounded"
            onClick={() => onSave(index)}
          >
            <Check className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

interface CardComponentProps {
  sections: Section[];
  onEdit: (index: number) => void;
  onCancel: (index: number) => void;
  onSave: (index: number) => void;
  onInputChange: (index: number, value: string) => void;
}

export default function CardComponent({
  sections,
  onEdit,
  onCancel,
  onSave,
  onInputChange,
}: CardComponentProps) {
  const form = useForm();

  const handleSave = (index: number) => {
    form.handleSubmit((data) => {
      onSave(index, data[`section_${index}`]);
    })();
  };

  return (
    <Form {...form}>
      <Card className="w-full max-w-md">
        <div className="card mb-24 md:mb-0">
          <CardHeader className="card-header">
            <CardTitle className="card-title">Author Bio</CardTitle>
          </CardHeader>
          <CardContent className="card-content">
            {sections.map((section, index) => (
              <form
                key={index}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave(index);
                }}
                className="mb-4"
              >
                <EditableSection
                  label={section.label}
                  value={section.value}
                  tempValue={section.tempValue}
                  isEditing={section.isEditing}
                  textArea={section.textArea}
                  index={index}
                  onEdit={onEdit}
                  onCancel={onCancel}
                  onSave={handleSave}
                  onInputChange={onInputChange}
                  control={form.control}
                />
                {!section.isEditing && (
                  <Button
                    className="flex items-center text-sm text-background mt-2"
                    onClick={() => onEdit(index)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </form>
            ))}
          </CardContent>
        </div>
      </Card>
    </Form>
  );
}
