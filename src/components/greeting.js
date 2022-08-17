import Userfront from "@userfront/react"
import PDFDocument from "./pdfkit.standalone"
import blobStream from "./blob-stream"

const doc = new PDFDocument();

// pipe the document to a blob
const stream = doc.pipe(blobStream());

// add your content to the document here, as usual

doc.fontSize(25).text("Some text with standard font!", 100, 100);

// Add another page
doc
  .addPage()
  .fontSize(25)
  .text("Here is some vector graphics...", 100, 100);

// Draw a triangle
doc
  .save()
  .moveTo(100, 150)
  .lineTo(100, 250)
  .lineTo(200, 250)
  .fill("#FF3300");

// Apply some transforms and render an SVG path with the 'even-odd' fill rule
doc
  .scale(0.6)
  .translate(470, -380)
  .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
  .fill("red", "even-odd")
  .restore();

// Add some text with annotations
doc
  .addPage()
  .fillColor("blue")
  .text("Here is a link!", 100, 100)
  .underline(100, 100, 160, 27, { color: "#0000FF" })
  .link(100, 100, 160, 27, "http://google.com/");

// get a blob when you're done
doc.end();

const a = document.createElement("a");
document.body.appendChild(a);
a.style = "display: none";

let blob;

function download() {
  if (!blob) return;
  var url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = 'test.pdf';
  a.click();
  window.URL.revokeObjectURL(url);
}

stream.on("finish", function() {
  // get a blob you can do whatever you like with
  blob = stream.toBlob("application/pdf");

  // or get a blob URL for display in the browser
  const url = stream.toBlobURL("application/pdf");
  document.createElement('iframe',{})
  document.body.appendChild(<iframe width={'100%'} height={'800px'}></iframe>)
  const iframe = document.querySelector("iframe");
  iframe.src = url;
});



export default function Greeting(){
    return(
        <div id={"playground"}>
            <h2 className="greetings">Welcome, {Userfront.user.name}</h2>
            
        </div>
    )
}