import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "./useUser";

type Story = {
  id: string;
  title: string;
  content: string;
  age_range: string;
  theme: string;
  locale: string;
  created_at: string;
};

export function useStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const user = useUser();

  const loadStories = () => {
    if (!user) {
      setStories([]);
      return;
    }
    supabase
      .from("stories")
      .select()
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        console.log(data);
        setStories(data ?? []);
      });
  };

  useEffect(() => {
    loadStories();
  }, [user]);

  return { stories, loadStories };
}
