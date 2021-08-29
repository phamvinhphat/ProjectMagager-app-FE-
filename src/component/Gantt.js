import {Chart} from 'react-google-charts';
import moment from "moment";
import {useRef, useState} from "react";
import TaskEditModal from "../pages/Task/TaskEditModal";
import {Card} from "@material-ui/core";


const columns = [
    {type: "string", label: "Task ID"},
    {type: "string", label: "Task Name"},
    {type: "string", label: "Resource"},
    {type: "date", label: "Start"},
    {type: "date", label: "End"},
    {type: "number", label: "Duration"},
    {type: "number", label: "Percent Complete"},
    {type: "string", label: "Dependencies"}
];

const formatData = (data) => {
    let r = [];
    data.forEach(row => {
        let p_n = null;
        if (row.parentNId !== "00000000-0000-0000-0000-000000000000")
            p_n = row.parentNId;
        let start = convertToDateSTD(row.startDate);
        let end = convertToDateSTD(row.dueDate);
        //Adding new Records
        let temp = [row.id,
            row.name,
            p_n,
            start, end,
            daysToMilliseconds(row.duration),
            row.percent, p_n];
        r.push(temp);
    });
    return r;
}

function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
}

function convertToDateSTD(string) {
    let date = moment(string.split("T").join(" "), "YYYY-MM-DD HH:mm:ss");
    let year = date.year();
    let month = date.month();
    let day = date.date();
    // let hour = moment(string).hour();
    // let min = moment(string).minute();
    // let sec = moment(string).second();
    return new Date(year, month, day);
}


const GanttChart = ({data, id, toggleMount}) => {
    const [isShow, setIsShow] = useState(false);
    const [taskId, setTaskId] = useState("");
    let records = formatData(data);


    const modalRef = useRef(null);

    const toggleModal = (val) => {
        loadTaskId(val);
        setIsShow(!isShow);
    }
    const loadTaskId = (value) => setTaskId(value);


    let counter = records.length > 5 ? records.length : 5
    let options = {
        height: (counter * 45 + 45),
        width: "100%",
        gantt: {
            animation: {
                easing: 'out',
                startup: true,
            },
        },
        legend: { position: "bottom" }
    };

    let chartEvents = [
        {
            eventName: 'ready',
            callback: ({chartWrapper, google}) => {
                const chart = chartWrapper.getChart();
                google.visualization.events.addListener(chart, "select", e => {
                    const select = chart.getSelection();
                    const dataTable = chartWrapper.getDataTable();
                    if (select.length > 0)
                        toggleModal(dataTable.getValue(select[0].row, 0));
                });
            }

        },
    ];
    return (
        <div key={id}>
            <TaskEditModal
                taskId={taskId}
                isShow={isShow}
                toggle={toggleModal}
                modalRef={modalRef}
                toggleMount={toggleMount}
            />
            <Card variant={"outlined"} placeholder={"No value"}>
                <Chart
                    chartType="Gantt"
                    data={[columns, ...records]}
                    chartEvents={chartEvents}
                    options={options}
                    legendToggle={true}
                />
            </Card>
        </div>
    )
}
export default GanttChart;