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
import { jsPDF } from "jspdf";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import Item from "antd/es/list/Item";

export default function () {
    const { block_id } = useParams()
    const [criterias, setCriteria] = useState<{title: string, description: string,attachments: any,id: number}[]>([])
    const [open, setOpen] = useState(false)
    const [openSource, setOpenSource] = useState(false)
    const [curCriteria, setCurCriteria] = useState<number>(0)
    const [curSourceId, setSourceId] = useState<number>(0)
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
        console.log(criterias)
        var downloadfile: string = ''
        criterias.forEach((crit: any)=>{
            const sup1 = crit.description.replaceAll(' ', '_');
            downloadfile += '<h2>' + crit.id + '.' + sup1
            crit.attachments.forEach((evi: any) => {
                const sup2 = evi.title.replaceAll(' ', '_');
                downloadfile += '<h3>'+crit.id + '.' + evi.id+ '.' + sup2 + '</h3>'
                // downloadfile += evi.name
                
            });
            downloadfile += '</h2>'
        })
        var pdf = new jsPDF('p', 'pt', 'a4');
        pdf.html(downloadfile,{
            callback: function (doc) {
                doc.save();
            },
            margin:[50,50,50,50],
            width: 180,
            autoPaging: true
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
    const openSourceModal = (id: number, source_id: number) => {
        setOpenSource(true)
        setCurCriteria(id)
        setSourceId(source_id)
    }

    const closeModal = () => {
        setOpen(false)
    }

    const closeSourceModal = () => {
        setOpenSource(false)
    }
    const addSource = (name1: string, title1: string) =>{
        let newSource = {
            id: curSourceId + 1,
            name: name1,
            title: title1
        }
        if (block_id) {
            getBearerHeader().then(config => {
                return axios.post(API.Blocks.AddSource(block_id,curCriteria.toString()), newSource, config)
            }).then(res => {
                console.log(res)
            })
        }
        criterias[curCriteria-1].attachments.push(newSource)
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
                description: crit,
                attachments: [],
                id: criterias.length + 1
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
                        <Button icon={<PlusOutlined />} onClick={() => openSourceModal(item.id,item.attachments.length)}>
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
                                            <h2>Dẫn chứng số {item1.id}:</h2>
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
        <AddCritModal open={open} close={closeModal} addCrit={addCriteria} />
        <AddSource open={openSource} close={closeSourceModal} addSource={addSource}/>
    </Layout.Content >
}

function saveBlocksAsHTML() {
    throw new Error("Function not implemented.");
}

