import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

const AddCompanySocialLink = ({
  onAdd,
  availablePlatforms,
}: {
  onAdd: (platform: string, url: string) => void;
  availablePlatforms: { name: string; icon: React.ReactNode }[];
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlatform && url.trim()) {
      onAdd(selectedPlatform, url);
      setSelectedPlatform("");
      setUrl("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Platform</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {availablePlatforms.map((platform) => (
            <button
              key={platform.name}
              type="button"
              onClick={() => setSelectedPlatform(platform.name)}
              className={`hover:bg-accent flex items-center justify-center space-x-1 rounded-full border p-2 text-sm ${
                selectedPlatform === platform.name
                  ? "border-primary bg-primary/5"
                  : ""
              }`}
            >
              {platform.icon}
              <span className="hidden sm:inline">{platform.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={`Enter ${selectedPlatform || "social media"} URL`}
          required
          className="rounded-full"
        />
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setSelectedPlatform("");
            setUrl("");
          }}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!selectedPlatform || !url.trim()}
          className="w-full sm:w-auto"
        >
          Add Link
        </Button>
      </div>
    </form>
  );
};

export default AddCompanySocialLink;
