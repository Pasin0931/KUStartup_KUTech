"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";

import { mentors_name } from "@/lib/dataa"
import { participants_name } from "@/lib/dataa"
import { attendance } from "@/lib/dataa"
import { date_session } from "@/lib/dataa"

import Image from "next/image"

import { motion } from "framer-motion"

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"

import {
    Field,
    FieldDescription,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea";


export default function HomePage() {

    const [thisMentor, setThisMentor] = useState<string>('');
    const [thisParName, setThisParName] = useState<string>('');
    const [thisAttendance, setThisAttendance] = useState<string>('');
    const [thisSession, setThisSession] = useState<string>('');

    const [asst1, setAsst1] = useState<number | null>();
    const [asst2, setAsst2] = useState<number | null>();
    const [asst3, setAsst3] = useState<number | null>();

    const [feedback, setFeedBack] = useState<string>('');
    const [bhFeedBack, setBhFeedBack] = useState<string>('')

    const handle_submit = async () => {
        if (!confirm("Are you sure that you want to submit ?")) {
            return
        }

        // alert(process.env.SHEET_LINK_URL)

        await fetch("/api/submit", {
            method: "POST",
            body: JSON.stringify({
                mentor: thisMentor,
                participant: thisParName,
                attendance: thisAttendance,
                session: thisSession,
                asst1,
                asst2,
                asst3,
                feedback,
                bhFeedback: bhFeedBack,
            }),
        });

        setThisMentor('')
        setThisParName('')
        setThisAttendance('')
        setThisSession('')
        setAsst1(null)
        setAsst2(null)
        setAsst3(null)
        setFeedBack('')
        setBhFeedBack('')

        alert("Record saved")
    }

    return (
        <div className="flex flex-col items-center h-screen w-full overflow-y-auto py-28">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col justify-center items-center object-cover border-4 border-gray rounded-xl p-8 gap-6 sm:w-110 md:w-180 lg:w-180 shadow-2xl"
            >

                <div className="">
                    <Image
                        alt="logo"
                        src="/ku.png"
                        width={250}
                        height={100}
                        className="/ku.png"
                    />
                </div>
                <h1 className="font-bold text-3xl">KU Startup & KU Tech</h1>

                <div className="bg-[#D3D3D3] w-full h-[3px] rounded rounded-100"></div>

                <div className="w-full">
                    <h2 className="flex flex-col justify-center items-center pb-6 font-bold">All fills are required in order to submit</h2>

                    <h2 className="self-start pl-4 pb-1 font-bold">Mentor Name</h2>
                    <Combobox
                        items={mentors_name}
                        value={thisMentor}
                        onValueChange={(value) => setThisMentor(value ?? '')}
                    >
                        <ComboboxInput placeholder="Select your mentor name" />
                        <ComboboxContent>
                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                            <ComboboxList>
                                {(item) => (
                                    <ComboboxItem key={item[0]} value={item[0]}>
                                        {item[0]} | {item[1]}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </div>

                <div className="w-full">
                    <h2 className="self-start pl-4 pb-1 font-bold">Participants Name</h2>
                    <Combobox
                        items={participants_name}
                        value={thisParName}
                        onValueChange={(value) => setThisParName(value ?? '')}
                    >
                        <ComboboxInput placeholder="Select participant name" />
                        <ComboboxContent>
                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                            <ComboboxList>
                                {(item) => (
                                    <ComboboxItem key={item} value={item}>
                                        {item}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </div>

                <div className="w-full">
                    <h2 className="self-start pl-4 pb-1 font-bold">Attendance</h2>
                    <Combobox
                        items={attendance}
                        value={thisAttendance}
                        onValueChange={(value) => setThisAttendance(value ?? '')}
                    >
                        <ComboboxInput placeholder="Select participant attendance" />
                        <ComboboxContent>
                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                            <ComboboxList>
                                {(item) => (
                                    <ComboboxItem key={item} value={item}>
                                        {item}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </div>

                <div className="w-full">
                    <h2 className="self-start pl-4 pb-1 font-bold">Session</h2>
                    <Combobox
                        items={date_session}
                        value={thisSession}
                        onValueChange={(value) => setThisSession(value ?? '')}
                    >
                        <ComboboxInput placeholder="Select your session" />
                        <ComboboxContent>
                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                            <ComboboxList>
                                {(item) => (
                                    <ComboboxItem key={item} value={item}>
                                        {item}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </div>
                {thisMentor.trim() !== '' && thisParName.trim() !== '' && thisAttendance.trim() !== '' && thisSession.trim() !== '' &&
                    thisMentor.trim() !== '---' && thisParName.trim() !== '---' && thisAttendance.trim() !== '---' && thisSession.trim() !== '---' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.3 }}
                            className="w-full mt-3"
                        >
                            <div className="bg-[#D3D3D3] w-full h-[3px] rounded rounded-100 mb-9"></div>

                            <div>
                                <FieldSet className="w-full max-w">
                                    <FieldLegend variant="label">Skill Assetment 1</FieldLegend>
                                    <FieldDescription>
                                        Yearly and lifetime plans offer significant savings.
                                    </FieldDescription>
                                    <RadioGroup value={asst1?.toString() ?? ''} onValueChange={(value) => setAsst1(Number(value))}>
                                        <Field orientation="horizontal">
                                            <RadioGroupItem value="1" id="asst1-1" />
                                            <FieldLabel htmlFor="asst1-1" className="font-normal">
                                                1 (สามารถ ...)
                                            </FieldLabel>
                                        </Field>
                                        <Field orientation="horizontal">
                                            <RadioGroupItem value="2" id="asst1-2" />
                                            <FieldLabel htmlFor="asst1-2" className="font-normal">
                                                2 (สามารถ ...)
                                            </FieldLabel>
                                        </Field>
                                        <Field orientation="horizontal">
                                            <RadioGroupItem value="3" id="asst1-3" />
                                            <FieldLabel htmlFor="asst1-3" className="font-normal">
                                                3 (สามารถ ...)
                                            </FieldLabel>
                                        </Field>
                                    </RadioGroup>
                                </FieldSet>
                            </div>

                            <div className="pt-6">
                                <FieldSet className="w-full max-w">
                                    <FieldLegend variant="label">Skill Assetment 2</FieldLegend>
                                    <FieldDescription>
                                        Yearly and lifetime plans offer significant savings.
                                    </FieldDescription>
                                    <RadioGroup value={asst2?.toString() ?? ''} onValueChange={(value) => setAsst2(Number(value))}>
                                        <Field orientation="horizontal">
                                            <RadioGroupItem value="1" id="asst2-1" />
                                            <FieldLabel htmlFor="asst2-1" className="font-normal">
                                                1 (สามารถ ...)
                                            </FieldLabel>
                                        </Field>
                                        <Field orientation="horizontal">
                                            <RadioGroupItem value="2" id="asst2-2" />
                                            <FieldLabel htmlFor="asst2-2" className="font-normal">
                                                2 (สามารถ ...)
                                            </FieldLabel>
                                        </Field>
                                        <Field orientation="horizontal">
                                            <RadioGroupItem value="3" id="asst2-3" />
                                            <FieldLabel htmlFor="asst2-3" className="font-normal">
                                                3 (สามารถ ...)
                                            </FieldLabel>
                                        </Field>
                                    </RadioGroup>
                                </FieldSet>
                            </div>

                            <div className="pt-6">
                                <FieldSet className="w-full max-w">
                                    <FieldLegend variant="label">Skill Assetment 3</FieldLegend>
                                    <FieldDescription>
                                        Yearly and lifetime plans offer significant savings.
                                    </FieldDescription>
                                    <RadioGroup value={asst3?.toString() ?? ''} onValueChange={(value) => setAsst3(Number(value))}>
                                        <Field orientation="horizontal">
                                            <RadioGroupItem value="1" id="asst3-1" />
                                            <FieldLabel htmlFor="asst3-1" className="font-normal">
                                                1 (สามารถ ...)
                                            </FieldLabel>
                                        </Field>
                                        <Field orientation="horizontal">
                                            <RadioGroupItem value="2" id="asst3-2" />
                                            <FieldLabel htmlFor="asst3-2" className="font-normal">
                                                2 (สามารถ ...)
                                            </FieldLabel>
                                        </Field>
                                        <Field orientation="horizontal">
                                            <RadioGroupItem value="3" id="asst3-3" />
                                            <FieldLabel htmlFor="asst3-3" className="font-normal">
                                                3 (สามารถ ...)
                                            </FieldLabel>
                                        </Field>
                                    </RadioGroup>
                                </FieldSet>
                            </div>

                            <div className="mt-6">
                                <div className="flex flex-col justify-cemter items-center pb-2">
                                    <h3 className="flex flex-col justify-center items-center font-bold">Feedback</h3>
                                    <p className="text-[#FF0F0F]">(* สำหรับพิมพ์ประเมินผลงาน สิ่งที่ทำได้ดี และสิ่งที่ควรพัฒนา)</p>
                                </div>
                                <Textarea value={feedback} onChange={(e) => setFeedBack(e.target.value)}></Textarea>
                            </div>

                            <div className="mt-6">
                                <div className="flex flex-col justify-cemter items-center pb-2">
                                    <h3 className="flex flex-col justify-center items-center font-bold">Feedback Beheavior</h3>
                                    <p className="text-[#FF0F0F]">(* สำหรับประเมินพฤติกรรมในคลาส)</p>
                                </div>
                                <Textarea value={bhFeedBack} onChange={(e) => setBhFeedBack(e.target.value)}></Textarea>
                            </div>

                            {asst1 !== null && asst2 !== null && asst3 !== null && feedback.trim() !== '' && bhFeedBack.trim() !== '' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.7 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, ease: "backOut" }}
                                    className="flex flex-col items-center justify-center"
                                >
                                    <Button onClick={() => handle_submit()} className='w-40 h-10 mt-6 bg-gradient-to-br from-[#7FC8C4] via-[#2E6E8E] to-[#1B2A4A] text-white'>Submit Form</Button>
                                </motion.div>
                            )}

                        </motion.div>
                    )}
            </motion.div>
        </div >
    )
}