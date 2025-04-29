import { useState, ChangeEvent, ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileText, CheckCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define types for our components
interface FileUploadProps {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  file: File | null;
  accept: string;
  icon: ReactNode;
}

interface SubmitButtonProps {
  onClick: () => void;
  isSubmitting: boolean;
  disabled: boolean;
}

function App() {
  const [studentFile, setStudentFile] = useState<File | null>(null);
  const [answerKeyFile, setAnswerKeyFile] = useState<File | null>(null);
  const [strictnessLevel, setStrictnessLevel] = useState<string>("Lenient");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleStudentFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setStudentFile(e.target.files[0]);
    }
  };

  const handleAnswerKeyFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAnswerKeyFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    console.log({
      studentFile,
      answerKeyFile,
      strictnessLevel,
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  // File upload component
  const FileUpload = ({
    label,
    onChange,
    file,
    accept,
    icon,
  }: FileUploadProps) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="relative">
        <Input
          type="file"
          onChange={onChange}
          accept={accept}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
        />
        <div
          className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center h-32 transition-colors ${
            file
              ? "bg-green-50 border-green-300"
              : "bg-gray-50 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {file ? (
            <>
              <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
              <p className="text-sm text-center font-medium text-gray-700 truncate max-w-full">
                {file.name}
              </p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </>
          ) : (
            <>
              {icon}
              <p className="text-sm text-center text-gray-500 mt-2">
                Drop your file here or{" "}
                <span className="text-blue-500 font-medium">browse</span>
              </p>
              <p className="text-xs text-gray-400">Supports PDF, JPG, PNG</p>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // Submit button component using shadcn components
  const SubmitButton = ({
    onClick,
    isSubmitting,
    disabled,
  }: SubmitButtonProps) => {
    return (
      <div className="space-y-4">
        {disabled && !isSubmitting && (
          <Alert className="bg-blue-50 text-blue-800 border-blue-200">
            <AlertDescription>
              Please upload both the student script and answer key to proceed.
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={onClick}
          disabled={disabled}
          className="w-full py-6 text-lg font-medium shadow-md transition-all duration-200 rounded-md"
          variant={disabled ? "outline" : "default"}
          size="lg"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            <span className="flex items-center justify-center">
              Submit for Correction
            </span>
          )}
        </Button>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-2xl px-4">
        <Card className="w-full shadow-lg border-blue-100">
          <CardHeader className="space-y-1 bg-blue-50 rounded-t-lg border-b border-blue-100">
            <CardTitle className="text-3xl font-bold text-blue-900">
              Answer Sheet Evaluator
            </CardTitle>
            <CardDescription className="text-blue-700">
              Upload answer sheets and set evaluation parameters
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FileUpload
                label="Student's Answer Script"
                onChange={handleStudentFileChange}
                file={studentFile}
                accept=".pdf,.jpg,.jpeg,.png"
                icon={<FileText className="h-10 w-10 text-blue-400" />}
              />

              <FileUpload
                label="Teacher's Answer Key"
                onChange={handleAnswerKeyFileChange}
                file={answerKeyFile}
                accept=".pdf,.jpg,.jpeg,.png"
                icon={<FileText className="h-10 w-10 text-blue-400" />}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-center pb-8">
            <div className="w-full max-w-md">
              <SubmitButton
                onClick={handleSubmit}
                isSubmitting={isSubmitting}
                disabled={!studentFile || !answerKeyFile || isSubmitting}
              />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default App;
