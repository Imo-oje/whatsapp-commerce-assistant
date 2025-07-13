import { useQuery } from "@tanstack/react-query";
import { ArrowLeftCircle, PlusCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { useNavigate } from "react-router";
import { searchUsers } from "~/api/api";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Switch } from "~/components/ui/switch";

export default function CreateRole() {
  const [tabNames] = useState([
    "Basic Info",
    "Set Permisions",
    "Review Details",
  ]);
  const [isPending, startTransion] = useTransition();
  const [currentTab, setCurrentTab] = useState("1");
  const [formData, setFormData] = useState({
    role_permissions: [],
    assignedTo: [],
    role_name: "",
    query: "",
  });
  const [assigned, setAssigned] = useState<string[]>([]);
  const navigate = useNavigate();

  const goToNextTab = () => {
    const nextIndex = Math.min(Number(currentTab) + 1, tabNames.length);
    setCurrentTab(nextIndex.toString());
  };

  const assignRole = (userId: string) => {
    setAssigned((prevVal) => {
      if (assigned.includes(userId)) {
        return prevVal.filter((id) => id !== userId);
      }
      return [...prevVal, userId];
    });
  };

  const { data } = useQuery({
    queryKey: ["query", formData.query],
    queryFn: () => searchUsers(formData.query),
    enabled: formData.query.trim().length > 0,
    retry: false,
  });

  return (
    <div className="flex flex-col space-y-2">
      <div onClick={() => navigate(-1)} className="flex gap-2 cursor-pointer">
        <span>
          <ArrowLeftCircle />
        </span>{" "}
        Back
      </div>

      <h2 className="text-2xl font-bold tracking-tight">Create New Role</h2>

      <Tabs
        value={currentTab}
        onValueChange={setCurrentTab}
        className="space-y-4"
      >
        <div className="pb-[2px] flex w-full justify-between">
          <TabsList className="bg-transparent flex gap-4">
            {tabNames.map((name, index) => (
              <TabsTrigger
                key={index}
                value={(index + 1).toString()}
                className="py-2 data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary transition-all"
              >
                {name}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex gap-x-2">
            <Button
              className="bg-secondary text-secondary-foreground hover:bg-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type={currentTab === "3" ? "submit" : "button"}
              onClick={goToNextTab}
              className="bg-primary text-primary-foreground"
            >
              {currentTab === "3" ? "Create Role" : "Continue"}
            </Button>
          </div>
        </div>
        <TabsContent value="1">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Basic Details</h3>
                <p className="text-secondary-foreground">
                  Add a basic information about this role you are creating.
                </p>
              </div>
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary">
                <span>
                  <PlusCircle />
                </span>
                Reporting manager
              </Button>
            </CardHeader>
            <hr />
            <CardContent className="flex flex-col gap-6">
              <Input
                name="role_name"
                value={formData.role_name.toUpperCase()}
                placeholder="Name"
                onChange={(e) => {
                  setFormData((prevVal) => ({
                    ...prevVal,
                    role_name: e.target.value,
                  }));
                }}
              />
              <div className="border p-4 rounded-xl w-full flex flex-col gap-4">
                <div>
                  <label htmlFor="assignRole" className="text-xl font-bold">
                    Assign this role
                  </label>
                  <Input
                    id="assignRole"
                    type="search"
                    onChange={(e) => {
                      startTransion(() => {
                        setFormData((prevVal) => ({
                          ...prevVal,
                          query: e.target.value,
                        }));
                      });
                    }}
                    placeholder="Search existing employees and press enterto add them."
                  />
                </div>

                <div className="w-full flex gap-4">
                  {isPending && ""}
                  {formData.query.length > 0 &&
                    data?.length === 0 &&
                    "No matches"}
                  {data &&
                    data.length > 0 &&
                    data.map((user, idx) => (
                      <div
                        onClick={() => assignRole(user.id)}
                        key={idx}
                        className={`w- border rounded-2xl p-2 cursor-pointer ${
                          assigned.includes(user.id) && "bg-red-500"
                        }`}
                      >
                        <h3>{user.lastName + " " + user.firstName}</h3>
                        <p>{user.email}</p>
                        <span>{user.id}</span>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="2">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Set permissions</h3>
                <p className="text-secondary-foreground">
                  Modify what individuals on this role can do
                </p>
              </div>
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary">
                <span>
                  <PlusCircle />
                </span>
                Reporting manager
              </Button>
            </CardHeader>
            <hr />
            <CardContent>
              <div className="border p-4 rounded-xl w-full flex flex-col gap-4">
                <p className="text-secondary-foreground">Admin access</p>
                <Switch />
                <Label htmlFor="toggleAdminPermissions">Enable all</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="3">
          <Card></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
