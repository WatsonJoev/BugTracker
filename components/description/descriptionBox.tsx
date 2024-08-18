"use client";

import React from "react";

import SimpleMDE from "react-simplemde-editor";

export default function DescriptionBox({description}:any) {
  return (
    <div>
        <div dangerouslySetInnerHTML={{ __html: description }} />
        {/* <SimpleMDE
            value={}
        /> */}
    </div>
  )
}
