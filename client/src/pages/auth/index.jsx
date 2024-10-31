import CommonForm from "@/components/commom-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { GraduationCap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("signin");
  function handleTabChange(value) {
    setActiveTab(value);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to={"/"} className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="font-extrabold text-xl">LMS LEARN</span>
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card className="p-6 mt-2 space-y-4">
              <CardHeader>
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>
                  Enter your details to get started
                </CardDescription>
                <CardContent className="space-y-2">
                  <CommonForm
                    formControls={signInFormControls}
                    buttonText={"SignIn"}
                  />
                </CardContent>
              </CardHeader>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card className="p-6 mt-2 space-y-4">
              <CardHeader>
                <CardTitle>Sign Up to your account</CardTitle>
                <CardDescription>
                  Enter your Email and password to access your account
                </CardDescription>
                <CardContent className="space-y-2">
                  <CommonForm
                    formControls={signUpFormControls}
                    buttonText={"signUp"}
                  />
                </CardContent>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
