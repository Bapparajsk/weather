// const http = require("http");
// const fs = require("fs");
// const requests = require("requests");
//
// const homeFile = fs.readFileSync("index.html", "utf-8");
//
// const repliesData = (file, value) => {
//     let newHomeFile = file.replace("{%tempval%}", value.main.temp)
//     newHomeFile = newHomeFile.replace("{%tempmax%}", value.main.temp_max)
//     newHomeFile = newHomeFile.replace("{%tempmin%}", value.main.temp_min);
//     // newHomeFile = newHomeFile.replace("{%tempstatus%}", value.weather[0].main);
//     return newHomeFile;
// }
//
// const server = http.createServer((req, res) => {
//     if (req.url =="/") {
//         requests('https://api.openweathermap.org/data/2.5/weather?q=murshidabad&appid=ce46e55d6bc343fc03418e45fe7908ec&units=metric')
//             .on('data', (chunk) => {
//                 const data = JSON.parse(chunk);
//                 const arrData = [data];
//                 const realTimeData = arrData.map((value) => repliesData(homeFile, value)).join("");
//                 res.write(realTimeData);
//                 // console.log(arrData[0].weather[0].main);
//             })
//             .on('end', (err) => {
//                 if (err) return console.log('connection closed due to errors', err);
//                 res.end();
//             });
//     }
// });
//
// server.listen(8000, "127.0.0.1");

// use to express js
const express = require("express");
const fs = require("fs");
const requests = require("requests");

const homeFile = fs.readFileSync("index.html", "utf-8");

const repliesData = (file, value) => {
    let newHomeFile = file.replace("{%tempval%}", value.main.temp);
    newHomeFile = newHomeFile.replace("{%tempmax%}", value.main.temp_max);
    newHomeFile = newHomeFile.replace("{%tempmin%}", value.main.temp_min);
    newHomeFile = newHomeFile.replace("{%tempstatus%}", value.weather[0].main);

    let cityName = `${value.name}, ${value.sys.country}`;
    newHomeFile = newHomeFile.replace("{%cityName%}", cityName)
    return newHomeFile;
};

const app = express();

app.get("/", (req, res) => {
    requests('https://api.openweathermap.org/data/2.5/weather?q=haridwar&appid=ce46e55d6bc343fc03418e45fe7908ec&units=metric')
        .on('data', (chunk) => {
            const data = JSON.parse(chunk);
            const arrData = [data];
            const realTimeData = arrData.map((value) => repliesData(homeFile, value)).join("");
            res.send(realTimeData);
            // console.log(arrData);
        })
        .on('end', (err) => {
            if (err) return console.log('connection closed due to errors', err);
        });
});

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
