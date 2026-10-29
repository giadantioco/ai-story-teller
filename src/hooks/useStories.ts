import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "./useUser";

export type Story = {
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

  const loadStories = useCallback(() => {
    if (!user) {
      setStories([]);
      return;
    }
    supabase
      .from("stories")
      .select()
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        setStories(data ?? []);
        if (error) {
          console.error("Error:", error);
        }
      });
  }, [user]);

  const deleteStory = async (id: string) => {
    const { data, error } = await supabase
      .from("stories")
      .delete()
      .eq("id", id)
      .select();
    if (error) {
      console.error("Error:", error);
    } else if (data?.length === 0) {
      console.warn("Blocked by policy RLS");
    } else {
      loadStories();
    }
  };

  useEffect(() => {
    loadStories();
  }, [loadStories]);

  return { stories, loadStories, deleteStory };
}
