"use client";

import { interviewer } from "@/data/interview";
// import { generateFeedback } from "@/lib/actions/general.actions";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const CallStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  CONNECTING: "CONNECTING",
  IN_CALL: "IN_CALL",
  ENDED: "ENDED",
};

const Agent = ({ userName, userId, userImg, type, interviewId, questions }) => {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState(CallStatus.INACTIVE);
  const [messages, setMessages] = useState([]);

  //this hook handle vapi events
  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };
    const onCallEnd = () => {
      setCallStatus(CallStatus.ENDED);
    };
    const onMessage = (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = {
          role: message.role,
          content: message.transcript,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    const onSpeechStart = () => {
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      setIsSpeaking(false);
    };

    const onError = (error) => {
      console.error(error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  const handleFeedback = async () => {
    console.log("here it is the feedback");

    const { success, feedbackId } = await generateFeedback({
      interviewId: interviewId,
      transcript: messages,
      userId: userId,
    });

    if (success && feedbackId) {
      router.push(`/interview/${interviewId}/feedback`);
    } else {
      console.log("error saving feedback");
      router.push("/");
    }
  };

  useEffect(() => {
    if (callStatus === CallStatus.ENDED) {
      if (type === "generate") {
        router.push("/interview");
      } else {
        handleFeedback();
      }
    }
  }, [messages, callStatus, type, userId]);

  //handle call with vapi agent
  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(
        undefined,
        undefined,
        undefined,
        process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID,
        {
          variableValues: {
            username: userName,
            userid: userId,
          },
        }
      );
    } else {
      let formattedQuestions;

      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };

  //handle call disconnect
  const handleDisconnect = () => {
    setCallStatus(CallStatus.ENDED);
    vapi.stop();
  };

  const lastMessage = messages[messages.length - 1]?.content;
  const isCallEndedorInactive =
    callStatus === CallStatus.ENDED || callStatus === CallStatus.INACTIVE;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 mt-10">
        <div className=" relative border-2 border-gray-200 rounded-3xl flex flex-col items-center justify-center py-16  bg-gradient-to-b from-[#1A1C20] to-[#08090D];">
          <div className="flex items-center justify-center relative">
            <Image
              src="/ai.png"
              alt="vapi"
              width={150}
              height={150}
              className="object-cover"
            />
            {isSpeaking && (
              <span className="absolute bg-blue-400 inline-flex size-[100px] -z-10 animate-ping rounded-full bg-primary-200 opacity-75"></span>
            )}
          </div>
          <h3 className="font-semibold text-xl">Ai Interviewer</h3>
        </div>
        <div className="card-border">
          <div className="border-2 hidden bg-gradient-to-b from-[#1A1C20] to-[#08090D]; border-gray-200 rounded-3xl md:flex flex-col items-center justify-center gap-4 py-24">
            <Image
              src={userImg || "/user.png"}
              alt="user"
              width={540}
              height={540}
              className="rounded-full object-cover size-[150px]"
            />
            <h3 className="font-semibold text-xl">{userName}</h3>
          </div>
        </div>
      </div>
      {/* message box */}

      {messages.length > 0 && (
        <div className="w-full max-w-3xl mx-auto mb-6 border-2 border-gray-200 rounded-2xl p-6  bg-gradient-to-b from-[#1A1C20] to-[#08090D];">
          <div className="flex items-center justify-center">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      {/* call button */}
      <div className="w-full flex justify-center">
        {callStatus === "ACTIVE" ? (
          <Button
            variant={"destructive"}
            onClick={handleDisconnect}
            className="px-6"
          >
            End
          </Button>
        ) : (
          <Button
            onClick={handleCall}
            className="relative px-8 text-md bg-green-500 hover:bg-green-600"
          >
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            ></span>
            <span>{isCallEndedorInactive ? "call" : "Calling..."}</span>
          </Button>
        )}
      </div>
    </>
  );
};

export default Agent;
