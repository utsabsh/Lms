import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CourseSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <label>Upload Course Image</label>
          <input type="file" accept="image/*" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseSettings;
