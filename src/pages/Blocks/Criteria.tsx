import { Avatar, Button, Card, Collapse, Divider, Empty, Layout, List } from "antd";
import { BookOutlined, FilePdfFilled, PlusOutlined, LineChartOutlined, DownloadOutlined } from '@ant-design/icons';
//import AddCriteriaModal from "./Modals/AddCriteriaModal";
import AddCritModal from "../../modals/AddCritModal";
import { useEffect, useState } from "react";
import AddSource from "./Modals/AddSource";
import { getBearerHeader } from "../../utils";
import axios from "axios";
import API from "../../api";
import { useParams } from "react-router-dom";
import * as markdownpdf from 'markdown-pdf';
import { jsPDF } from "jspdf";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
// import { saveAs } from 'file-saver';
// import htmlDocx from 'html-docx-js';
//import MarkdownPDF from "markdown-pdf";
// import 'jspdf-autotable';
// import 'jspdf/dist/polyfills.js';

export default function () {
    const { block_id } = useParams()
    const [criterias, setCriteria] = useState<{ title: string, description: string}[]>([])
    const [open, setOpen] = useState(false)
    const [openSource, setOpenSource] = useState(false)
    const openModal = () => {
        setOpen(true)
    }
    const [markdown, setMarkdown] = useState<string>("");
    const editor: BlockNoteEditor | null = useBlockNote({
        onEditorContentChange: (editor: BlockNoteEditor) => {
            // Converts the editor's contents from Block objects to Markdown and 
            // saves them.
            const saveBlocksAsHTML = async () => {
                const markdown: string =
                    await editor.blocksToHTML(editor.topLevelBlocks);
                setMarkdown(markdown);
            };
            saveBlocksAsHTML();
            
        }
    });
    ;
    const reportExport = () =>{
        
        var downloadfile: string = ''
        criterias.forEach((crit: any)=>{
            downloadfile += '<h2>' + crit.id + '.  ' + crit.description 
            // crit.attachments.forEach((evi: any) => {
            //     downloadfile += '<h1>'+crit.id + '.' + evi.id+ ' ' + evi.title + '</h1>'
            //     downloadfile += evi.name
            // });
            downloadfile += '</h2>'
        })
        
        var secrect: string = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body><div><h2>1)Programme_Specification</h2><h3>1.1.Dan_chung_1</h3><h3>1.2.Dan_chung 2</h3><p>Noi dung 2</p><h2>2)DANH_GIa_SINH VIEN</h2><p></p></div></body></html>'
        // const htmlString = secrect.replace(/(\r\n|\n|\r)/gm, '');
        // console.log(htmlString)
        var pdf = new jsPDF('p', 'pt', 'a4');
        // const doc = new jsPDF({
        //     orientation: "landscape",
        //     unit: "in",
        //     format: [4, 2]
        // });

        // doc.text("Cấu trúc chương trình", 1, 1);
        // doc.save("two-by-four.pdf");
        // pdf.text("Hello world!", 10, 10);
        // pdf.save("two-by-four.pdf");
        pdf.html(secrect,{
            callback: function (doc) {
                doc.save();
            },
            margin:[100,100,100,100],
            width: 5000,
            fontFaces: [{
                family: 'BeVietnamPro-Thin.ttf',
                src: [
                    {
                        url: '/fonts/BeVietnamPro-Thin.ttf',
                        format: 'truetype',
                    },
                ],
            },]
        });
    }
    const getPanelStyle = (index: any) => {
        // Define the font style for the text
        const fontStyle = {
            //fontFamily: 'Arial, sans-serif',
            //fontWeight: 'bold',
            //color: 'white'
        };

        // Combine the font style with the panel color
        return {
            backgroundColor: getPanelColor(index),
            ...fontStyle,
            color: getWordColor(index),
            //fontWeight: 'bold',
        };
    };
    const getPanelColor = (index: any) => {
        // Define an array of colors for the panels
        const colors = ['#D9D9D9'];
        // Use modulo operator to cycle through the colors array
        return colors[index % colors.length];
    };
    const getWordColor = (index: any) => {
        // Define an arra3401D83y of colors for the panels
        const colors = ['#C20000'];
        // Use modulo operator to cycle through the colors array
        return colors[index % colors.length];
    };
    const openSourceModal = () => {
        setOpenSource(true)
    }

    const closeModal = () => {
        setOpen(false)
    }

    const closeSourceModal = () => {
        setOpenSource(false)
    }

    const addCriteria = (crit: string) => {
        if (block_id) {
            let newNum: number = criterias.length + 1
            let body_req: any = {
                id: newNum,
                contents: crit,
            }
            getBearerHeader().then(config => {
                return axios.post(API.Blocks.AddCrit(block_id),body_req, config)
            }).then(res => {
                console.log(res)
            })
            let newCrit = {
                title: "Tiêu chí #" + (criterias.length + 1),
                description: crit
            }
            criterias.push(newCrit)
        }
    }
    useEffect(() => {
        if (block_id) {
            getBearerHeader().then(config => {
                return axios.get(API.Blocks.GetCrit(block_id), config)
            }).then(res => {
                let critList: any = []
                res.data["body"].forEach((crit: any)=>{
                    let attachList: { id: number, name: string, title: string }[] = []
                    getBearerHeader().then(config => {
                        return axios.get(API.Blocks.GetEvi(block_id,crit.id), config)
                    }).then(res1 => {
                        res1.data["body"].forEach((evi: any) =>{
                            attachList.push({
                                id: evi.id,
                                name: evi.contents,
                                title: evi.title
                            })
                        })
                    })
                    critList.push({
                        title: "Tiêu chí #" + crit.id,
                        description: crit.contents,
                        attachments: attachList,
                        id : crit.id
                    })
                })
                //console.log(critList)
                setCriteria(critList)
            })
        }
    }, [])
    return <Layout.Content
        style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
        }}
    >
        <Card
            title="Tiêu chí"
            extra={
                <div>
                    <Button icon={<PlusOutlined />} onClick={openModal}>
                        Thêm tiêu chí
                    </Button>{' '}
                    <Button icon={<DownloadOutlined />} onClick={reportExport}>
                        Xuất báo cáo
                    </Button>
                </div>
            }
        >
            <Collapse>
                {criterias.map((item, idx) => (
                    <Collapse.Panel
                        key={idx}
                        header={
                            <span style={{
                                backgroundColor: getPanelColor(idx),
                                color: getWordColor(idx),
                                fontWeight: 'bold',
                                //fontFamily: 'Arial, sans-serif',
                            }}>{item.title + ': ' + item.description}</span>
                        }
                        style={getPanelStyle(idx)}
                    >
                        <Button icon={<PlusOutlined />} onClick={openSourceModal}>
                            Thêm dẫn chứng
                        </Button>
                        <Divider />

                        {item.attachments ? (
                            <List
                                itemLayout="horizontal"
                                dataSource={item.attachments}
                                renderItem={(item1: any, index) => (
                                    <List.Item>
                                        <div>
                                            <h2>Dẫn chứng số {item1.id}: {item1.title}</h2>
                                            <div dangerouslySetInnerHTML={{ __html: item1.name }} />
                                        </div>
                                    </List.Item>
                                )}
                            />
                        ) : (
                            <Empty />
                        )}
                    </Collapse.Panel>
                ))}
            </Collapse>
        </Card>
        <BlockNoteView editor={editor} />        
        <AddCritModal open={open} close={closeModal} addCrit={addCriteria} />
        <AddSource open={openSource} close={closeSourceModal} />
    </Layout.Content >
}

function saveBlocksAsHTML() {
    throw new Error("Function not implemented.");
}

