"use client";
import { useState } from "react";
import Agent from "@/components/Agent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AgentQuizStarter({ userName, userId, userImg }) {
  const [showAgent, setShowAgent] = useState(false);

  if (showAgent) {
    return (
      <Agent
        userName={userName}
        userId={userId}
        userImg={userImg}
        type="generate"
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ready to test your knowledge?</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Click the button below to generate an AI-powered interview tailored to
          your skills and experience. The AI will ask you a series of questions
          and provide feedback based on your responses.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => setShowAgent(true)}>Generate Interview</Button>
      </CardFooter>
    </Card>
  );
}
