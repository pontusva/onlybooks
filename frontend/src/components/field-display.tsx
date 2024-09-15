import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

import { Pencil, X, Check } from 'lucide-react'

// Reusable editable section component

// Reusable editable section component
const EditableSection = ({
  label,
  value,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  tempValue,
  onInputChange,
  index,
  textArea
}) => {
  return (
    <div className="grid gap-4">
      <h3 className="text-lg font-semibold">{label}</h3>
      {isEditing && textArea ? (
        <Textarea
          rows={5}
          value={tempValue}
          onChange={(e) =>
            onInputChange(index, e.target.value)
          }
          className="border p-2 rounded"
        />
      ) : isEditing && !textArea ? (
        <Input
          type="text"
          value={tempValue}
          onChange={(e) =>
            onInputChange(index, e.target.value)
          }
          className="border p-2 rounded"
        />
      ) : (
        <p className="text-sm text-muted-foreground">
          {value}
        </p>
      )}
      {isEditing && (
        <div className="flex justify-end space-x-2">
          <Button
            className="px-3 py-1 border rounded"
            onClick={() => onCancel(index)}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            className="px-3 py-1 bg-blue-500 text-white rounded"
            onClick={() => onSave(index)}>
            <Check className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      )}
    </div>
  )
}

export default function CardComponent({
  sections,
  onEdit,
  onCancel,
  onSave,
  onInputChange,
  textArea
}) {
  return (
    <Card className="w-full max-w-md">
      <div className="card mb-24 md:mb-0">
        <CardHeader className="card-header">
          <CardTitle className="card-title">
            Author Bio
          </CardTitle>
        </CardHeader>
        <CardContent className="card-content">
          {sections.map((section, index) => (
            <div key={index} className="mb-4">
              <EditableSection
                label={section.label}
                value={section.value}
                tempValue={section.tempValue}
                isEditing={section.isEditing}
                textArea={section.textArea}
                index={index}
                onEdit={onEdit}
                onCancel={onCancel}
                onSave={onSave}
                onInputChange={onInputChange}
              />
              {!section.isEditing && (
                <Button
                  className="flex items-center text-sm text-background mt-2"
                  onClick={() => onEdit(index)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </div>
    </Card>
  )
}
