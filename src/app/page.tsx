"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";

import { mentors_name } from "@/lib/dataa"
import { participants_name } from "@/lib/dataa"
import { attendance } from "@/lib/dataa"
import { date_session } from "@/lib/dataa"

import { Loader2 } from "lucide-react"

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

    const [pageState, setPageState] = useState('participant')

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [thisMentor, setThisMentor] = useState<string>('');
    const [thisParName, setThisParName] = useState<string>('');
    const [thisAttendance, setThisAttendance] = useState<string>('');
    const [thisSession, setThisSession] = useState<string>('');

    const [thisMentorEmail, setThisMentorEmail] = useState('')
    const [thisParEmail, setThisParEmail] = useState('')

    const [asst1, setAsst1] = useState<number | null>();
    const [asst2, setAsst2] = useState<number | null>();
    const [asst3, setAsst3] = useState<number | null>();

    const [feedback, setFeedBack] = useState<string>('');
    const [bhFeedBack, setBhFeedBack] = useState<string>('')

    // --- --- --- ---

    const [mentorName1, setMentorName1] = useState('')
    const [mentorEmail1, setMentorEmail1] = useState('')
    const [mentorName2, setMentorName2] = useState('')
    const [mentorEmail2, setMentorEmail2] = useState('')
    const [feedbackMentor, setFeedBackMentor] = useState('')

    const handle_submit = async () => {
        try {
            if (!confirm("Are you sure that you want to submit ?")) {
                return
            }

            setIsLoading(true)

            // alert(process.env.SHEET_LINK_URL)

            await fetch("/api/submit", {
                method: "POST",
                body: JSON.stringify({
                    mentor: thisMentor,
                    mentor_email: thisMentorEmail,
                    participant: thisParName,
                    participant_email: thisParEmail,
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
            setThisMentorEmail('')
            setThisParName('')
            setThisParEmail('')
            setThisAttendance('')
            setThisSession('')
            setAsst1(null)
            setAsst2(null)
            setAsst3(null)
            setFeedBack('')
            setBhFeedBack('')

            setMentorName1('')
            setMentorEmail1('')
            setMentorName2('')
            setMentorEmail2('')
            setFeedBackMentor('')

            alert("Record saved")

            setIsLoading(false)
        }
        catch (error) {
            console.error(error);
            alert("Error while submitting form");
        }
        finally {
            setIsLoading(false)
        }

    }

    const handle_mentor_submit = async () => {
        try {
            if (!confirm("Are you sure that you want to submit ?")) {
                return
            }

            setIsLoading(true)

            await fetch("/api/submitmentor", {
                method: "POST",
                body: JSON.stringify({
                    mentor1: mentorName1,
                    email1: mentorEmail1,
                    mentor2: mentorName2,
                    email2: mentorEmail2,
                    feedback: feedbackMentor,
                }),
            });

            setThisMentor('')
            setThisMentorEmail('')
            setThisParName('')
            setThisParEmail('')
            setThisAttendance('')
            setThisSession('')
            setAsst1(null)
            setAsst2(null)
            setAsst3(null)
            setFeedBack('')
            setBhFeedBack('')

            setMentorName1('')
            setMentorEmail1('')
            setMentorName2('')
            setMentorEmail2('')
            setFeedBackMentor('')

            alert("Record saved")

            setIsLoading(false)
        }
        catch (error) {
            console.error(error);
            alert("Error while submitting form (mentor)");
        }
        finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#1B1339] via-[#2E2B6E] to-[#1B2A4A]">
                <Loader2 className="size-20 animate-spin text-white" />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center h-screen w-full overflow-y-auto py-17 bg-gradient-to-br from-[#1B1339] via-[#2E2B6E] to-[#1B2A4A]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white flex flex-col justify-center items-center object-cover border-8 border-[#3A3690] rounded-3xl p-8 gap-6 sm:w-60 md:w-200 lg:w-200 shadow-2xl text-black"
            >

                <div className="">
                    <Image
                        alt="logo"
                        src="/newKU.png"
                        width={250}
                        height={100}
                    />
                </div>
                <h1 className="font-bold text-3xl">Startup 101 2026</h1>
                {/* <h2 className="font-bold text-md">KU STARTUP x KU TECH</h2> */}

                <div className="bg-[#D3D3D3] w-full h-[3px] rounded rounded-100"></div>

                <div className="w-full pl-4">
                    <FieldSet className="w-full max-w">
                        <FieldLegend variant="label" className="font-bold">Assetment</FieldLegend>
                        <FieldDescription>
                            Select an action
                        </FieldDescription>
                        <RadioGroup
                            value={pageState}
                            onValueChange={(value) => setPageState(value)}
                            className="flex flex-row gap-6"
                        >
                            <Field orientation="horizontal">
                                <RadioGroupItem value="participant" id="asst2-1" />
                                <FieldLabel htmlFor="asst2-1" className="font-normal">
                                    Participant
                                </FieldLabel>
                            </Field>
                            <Field orientation="horizontal">
                                <RadioGroupItem value="mentor" id="asst2-2" />
                                <FieldLabel htmlFor="asst2-2" className="font-normal">
                                    Mentor
                                </FieldLabel>
                            </Field>
                        </RadioGroup>
                    </FieldSet>
                </div>

                {pageState === "participant" ? (
                    <>
                        <div className="bg-[#D3D3D3] w-full h-[3px] rounded rounded-100"></div>

                        <div className="w-full">
                            <h2 className="flex flex-col justify-center items-center pb-6 font-bold">All fills are required in order to submit</h2>

                            <h2 className="self-start pl-4 pb-1 font-bold">Mentor Name</h2>
                            <Combobox
                                items={mentors_name}
                                value={thisMentor}
                                onValueChange={(value) => {
                                    const selected = mentors_name.find((item) => item[0] === value);
                                    setThisMentor(value ?? '');
                                    setThisMentorEmail(selected ? selected[1] : '');
                                }}
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
                                onValueChange={(value) => {
                                    const selected = participants_name.find((item) => item[0] === value);
                                    setThisParName(value ?? '');
                                    setThisParEmail(selected ? selected[1] : '');
                                }}
                            >
                                <ComboboxInput placeholder="Select participant name" />
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
                                            <FieldLegend variant="label">ข้อที่ 1: การมีส่วนร่วมและความกระตือรือร้น (Engagement & Proactiveness)</FieldLegend>
                                            <FieldDescription>
                                                ผู้เข้าร่วม/ทีม มีความกระตือรือร้น ตั้งใจฟัง และมีส่วนร่วมในการแลกเปลี่ยนหรือซักถามมากน้อยเพียงใด
                                            </FieldDescription>
                                            <RadioGroup value={asst1?.toString() ?? ''} onValueChange={(value) => setAsst1(Number(value))}>
                                                <Field orientation="horizontal">
                                                    <RadioGroupItem value="1" id="asst1-1" />
                                                    <FieldLabel htmlFor="asst1-1" className="font-normal">
                                                        1 คะแนน (ต่ำ): ขาดสมาธิ นิ่งเฉย ไม่ค่อยมีส่วนร่วมในการทำกิจกรรมหรือพูดคุย
                                                    </FieldLabel>
                                                </Field>
                                                <Field orientation="horizontal">
                                                    <RadioGroupItem value="2" id="asst1-2" />
                                                    <FieldLabel htmlFor="asst1-2" className="font-normal">
                                                        2 คะแนน (ปานกลาง): ให้ความร่วมมือตามขั้นตอน มีส่วนร่วมเมื่อถูกถาม ทำงานตามที่ได้รับมอบหมายได้ครบถ้วน
                                                    </FieldLabel>
                                                </Field>
                                                <Field orientation="horizontal">
                                                    <RadioGroupItem value="3" id="asst1-3" />
                                                    <FieldLabel htmlFor="asst1-3" className="font-normal">
                                                        3 คะแนน (สูง): กระตือรือร้นสูงมาก กล้าซักถาม ขอคำปรึกษาเชิงรุก และแลกเปลี่ยนความคิดเห็นกับ Mentor อย่างสม่ำเสมอ
                                                    </FieldLabel>
                                                </Field>
                                            </RadioGroup>
                                        </FieldSet>
                                    </div>

                                    <div className="pt-6">
                                        <FieldSet className="w-full max-w">
                                            <FieldLegend variant="label">ข้อที่ 2: ความเข้าใจและการนำเนื้อหาไปประยุกต์ใช้ (Concept Application & Task Progress)</FieldLegend>
                                            <FieldDescription>
                                                ผู้เข้าร่วม/ทีม สามารถทำความเข้าใจหัวข้อประจำวันและนำไปลงมือปฏิบัติกับชิ้นงาน/โปรเจกต์ได้ตรงเป้าหมายเพียงใด
                                            </FieldDescription>
                                            <RadioGroup value={asst2?.toString() ?? ''} onValueChange={(value) => setAsst2(Number(value))}>
                                                <Field orientation="horizontal">
                                                    <RadioGroupItem value="1" id="asst2-1" />
                                                    <FieldLabel htmlFor="asst2-1" className="font-normal">
                                                        1 คะแนน (ต่ำ): สับสนในโจทย์/ทฤษฎี ยังจับทิศทางงานไม่ได้ ชิ้นงานหรือผลลัพธ์ยังไม่คืบหน้า
                                                    </FieldLabel>
                                                </Field>
                                                <Field orientation="horizontal">
                                                    <RadioGroupItem value="2" id="asst2-2" />
                                                    <FieldLabel htmlFor="asst2-2" className="font-normal">
                                                        2 คะแนน (ปานกลาง): เข้าใจคอนเซ็ปต์หลัก ชิ้นงานพัฒนาไปตามโจทย์ได้ตามมาตรฐาน แต่อาจยังขาดมิติเชิงลึก
                                                    </FieldLabel>
                                                </Field>
                                                <Field orientation="horizontal">
                                                    <RadioGroupItem value="3" id="asst2-3" />
                                                    <FieldLabel htmlFor="asst2-3" className="font-normal">
                                                        3 คะแนน (สูง): เข้าใจโจทย์อย่างแตกฉาน ประยุกต์ใช้เครื่องมือได้อย่างแม่นยำ และงานมีความคืบหน้าเห็นผลลัพธ์ชัดเจน
                                                    </FieldLabel>
                                                </Field>
                                            </RadioGroup>
                                        </FieldSet>
                                    </div>

                                    <div className="pt-6">
                                        <FieldSet className="w-full max-w">
                                            <FieldLegend variant="label">ข้อที่ 3: การเปิดรับและปรับปรุงตามคำแนะนำ (Coachability & Team Dynamics)</FieldLegend>
                                            <FieldDescription>
                                                ผู้เข้าร่วม/ทีม มีทัศนคติที่ดีต่อการรับฟังคำแนะนำ และร่วมมือกันปรับปรุงพัฒนาต่อยอดผลงานได้ดีเพียงใด
                                            </FieldDescription>
                                            <RadioGroup value={asst3?.toString() ?? ''} onValueChange={(value) => setAsst3(Number(value))}>
                                                <Field orientation="horizontal">
                                                    <RadioGroupItem value="1" id="asst3-1" />
                                                    <FieldLabel htmlFor="asst3-1" className="font-normal">
                                                        1 คะแนน (ต่ำ): ยึดติดกับแนวคิดเดิม ไม่เปิดรับ Feedback หรือสมาชิกในทีมยังขาดการประสานงานที่ดี
                                                    </FieldLabel>
                                                </Field>
                                                <Field orientation="horizontal">
                                                    <RadioGroupItem value="2" id="asst3-2" />
                                                    <FieldLabel htmlFor="asst3-2" className="font-normal">
                                                        2 คะแนน (ปานกลาง): รับฟังข้อเสนอแนะ นำไปปรับแก้ตามคำแนะนำพื้นฐาน และทำงานร่วมกันในทีมได้ราบรื่น
                                                    </FieldLabel>
                                                </Field>
                                                <Field orientation="horizontal">
                                                    <RadioGroupItem value="3" id="asst3-3" />
                                                    <FieldLabel htmlFor="asst3-3" className="font-normal">
                                                        3 คะแนน (สูง): มี Coachability สูง พร้อมรับฟัง ปรับแก้งานอย่างรวดเร็ว และทีมมีพลังการทำงานร่วมกันอย่างมีประสิทธิภาพ
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
                                            <Button onClick={() => handle_submit()} className='w-40 h-10 mt-6 bg-gradient-to-br from-[#4A44A8] via-[#2E2B6E] to-[#1B1339] text-white'>Submit Form</Button>
                                        </motion.div>
                                    )}

                                </motion.div>
                            )}
                    </>
                ) : (
                    <>
                        <div className="w-full">
                            <div className="bg-[#D3D3D3] w-full h-[3px] rounded rounded-100 mb-6"></div>
                            <h2 className="flex flex-col justify-center items-center pb-6 font-bold">All fills are required in order to submit</h2>

                            <h2 className="self-start pl-4 pb-1 font-bold">Your Name</h2>
                            <Combobox
                                items={mentors_name}
                                value={mentorName1}
                                onValueChange={(value) => {
                                    const selected = mentors_name.find((item) => item[0] === value);
                                    setMentorName1(value ?? '');
                                    setMentorEmail1(selected ? selected[1] : '');
                                }}
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

                            <h2 className="self-start pl-4 pb-1 font-bold">Mentor to complete assetment</h2>
                            <Combobox
                                items={mentors_name}
                                value={mentorName2}
                                onValueChange={(value) => {
                                    const selected = mentors_name.find((item) => item[0] === value);
                                    setMentorName2(value ?? '');
                                    setMentorEmail2(selected ? selected[1] : '');
                                }}
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

                        <div className="">
                            <div className="flex flex-col justify-cemter items-center pb-2">
                                <h3 className="flex flex-col justify-center items-center font-bold">Feedback for another mentork</h3>
                                <p className="text-[#FF0F0F]">(* สำหรับพิมพ์ประเมินผลงาน สิ่งที่ทำได้ดี และสิ่งที่ควรพัฒนา สําหรับเพื่อน Mentor)</p>
                            </div>
                            <Textarea value={feedbackMentor} onChange={(e) => setFeedBackMentor(e.target.value)}></Textarea>
                        </div>

                        {mentorName1.trim() !== '' && mentorName2.trim() !== '' && feedbackMentor.trim() !== '' && mentorName1.trim() !== '---' && mentorName2.trim() !== '---' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, ease: "backOut" }}
                                className="flex flex-col items-center justify-center"
                            >
                                <Button onClick={() => handle_mentor_submit()} className='w-40 h-10 bg-gradient-to-br from-[#4A44A8] via-[#2E2B6E] to-[#1B1339] text-white'>Submit Form</Button>
                            </motion.div>
                        )}
                    </>
                )}

            </motion.div>
        </div >
    )
}