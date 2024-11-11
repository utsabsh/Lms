import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InstructorContext } from "@/context/instructor-context";
import { useContext } from "react";
import { Label } from "@/components/ui/label";
import { courseCurriculumInitialFormData } from "@/config";
import { mediaDeleteService, mediaUploadService } from "@/services";
import MediaProgressbar from "@/components/media-progress-bar";
import VideoPlayer from "@/components/video-player";

const CourseCurriculum = () => {
  const {
    courseCurriculumFormdata,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaProgress,
    mediauploadProgressPercentage,
    setMediauploadProgressPercentage,
  } = useContext(InstructorContext);

  function handleNewLecture() {
    setCourseCurriculumFormData([
      ...courseCurriculumFormdata,
      { ...courseCurriculumInitialFormData[0] },
    ]);
  }

  function handleCourseTitleChange(event, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormdata];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      title: event.target.value,
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  function handleFreePreviewChange(currentValue, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormdata];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  //Handle single lecture upload
  async function handleSingleLectureUpload(event, currentIndex) {
    console.log("file", event.target.files);
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);
      try {
        setMediaProgress(true);
        const response = await mediaUploadService(
          videoFormData,
          setMediauploadProgressPercentage
        );

        if (response.success) {
          let cpyCourseCurriculumFormData = [...courseCurriculumFormdata];
          cpyCourseCurriculumFormData[currentIndex] = {
            ...cpyCourseCurriculumFormData[currentIndex],
            videoUrl: response?.data?.playback_url,
            public_id: response?.data?.public_id,
          };
          setCourseCurriculumFormData(cpyCourseCurriculumFormData);
          setMediaProgress(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  function isCourseCurriculumFormDataValid() {
    return courseCurriculumFormdata.every((item) => {
      return (
        item &&
        typeof item === "object" &&
        item.title.trim() !== "" &&
        item.videoUrl.trim() !== ""
      );
    });
  }
  //handle video Replacement
  async function handleReplaceVideo(currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormdata];
    const getCurrentvideoPublicId = cpyCourseCurriculumFormData[0]?.public_id;
    const deleteCurrentMediaResponse = await mediaDeleteService(
      getCurrentvideoPublicId
    );
    if (deleteCurrentMediaResponse?.success) {
      cpyCourseCurriculumFormData[currentIndex] = {
        ...cpyCourseCurriculumFormData[currentIndex],
        videoUrl: "",
        public_id: "",
      };
      setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress}
          onClick={handleNewLecture}
        >
          Add Lecture
        </Button>
        {mediaUploadProgress ? (
          <MediaProgressbar
            isMediaUploading={mediaUploadProgress}
            progress={mediauploadProgressPercentage}
          />
        ) : null}
        <div className="mt-4 space-y-4">
          {courseCurriculumFormdata.map((curriculumItem, index) => (
            <div className="border p-5 rounded-md" key={index}>
              <div className="flex gap-5">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  className="max-w-96"
                  onChange={(event) => handleCourseTitleChange(event, index)}
                  value={courseCurriculumFormdata[index]?.title}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    checked={courseCurriculumFormdata[index]?.freePreview}
                    id={`freePreview-${index + 1}`}
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              {courseCurriculumFormdata[index]?.videoUrl ? (
                <div className="flex gap-3">
                  <VideoPlayer
                    url={courseCurriculumFormdata[index]?.videoUrl}
                    width="450px"
                    height="200px"
                  />
                  <Button onClick={() => handleReplaceVideo(index)}>
                    Replace video
                  </Button>
                  <Button className="bg-red-900">Delete lecture</Button>
                </div>
              ) : (
                <div className="mt-6">
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleSingleLectureUpload(e, index)}
                    className="mb-4"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;
