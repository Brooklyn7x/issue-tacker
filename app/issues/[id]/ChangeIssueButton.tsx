"use client";
import { Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const ChangeIssueStatus = ({ issue }: { issue: Issue }) => {
  if (!issue || typeof issue.status === "undefined") {
    return <p>Loading issue...</p>;
  }

  const changeIssueStatus = (status: string) => {
    axios
      .patch("/api/issues/" + issue.id, { status })
      .then(() => toast.success("Status updated successfully"))
      .catch(() => toast.error("Change could not be saved."));
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.status.toString()}
        onValueChange={changeIssueStatus}
      >
        <Select.Trigger aria-label="Change Status" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Status</Select.Label>
            <Select.Item value="OPEN">Open</Select.Item>
            <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
            <Select.Item value="CLOSED">Closed</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default ChangeIssueStatus;
