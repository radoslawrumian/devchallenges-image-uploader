const button = document.getElementById("uploadbutton");
const inside = document.getElementById("inside");
const select = document.createElement("INPUT");
document.cookie = "id = 0";
document.addEventListener('contextmenu', event => event.preventDefault());

document.cookie = "error = 0";
const bigtext = document.getElementsByClassName("bigtext")[0];
select.setAttribute("type", "file");

button.addEventListener("click", () => {
  select.click();
});

const readCookie = (name) => {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

select.addEventListener("change", () => {
  sender(select.files[0]);
});

droparena.addEventListener("drop", (ev) => {
  ev.preventDefault();
  console.log("dropnieto");
  console.log(ev.dataTransfer.files[0]);
  sender(ev.dataTransfer.files[0]);
});

const updateProgress = (env) => {
  if (document.getElementById("uploadbarinside") !== null) {
    console.log(Math.round((env.loaded / env.total) * 100));
    document.getElementById("uploadbarinside").style.width =
      Math.round((env.loaded / env.total) * 100) + "%";
  }
};

const idreader = (i) => {

  if (readCookie("error") == 1) {
    setTimeout(() => {
      setTimeout(() => {
        rect.style.height = "57px";
        inside.innerHTML = `
        <div class="bigtext">Wrong filetype or size</div>
        <div id="smalltext">File type must be Jpeg, Png, WebP or Gif. Max filesize is 10MB</div>
  
  
      `;
  
        setTimeout(() => {
          inside.style.opacity = "1";
        }, 300);
      }, 601);
      inside.style.opacity = "0";

      return
    }, 300);
  }else{




  if (readCookie("id") == 0) {




    console.log("nie odczytano cookie");
    i++;
    if (i > 15) {
      idNotSuccess();
    }
    console.log("proba pobrania id: " + i + "/15");
    setTimeout(() => {
      idreader(i);
    }, 500);
  } else {
    console.log("id obrazu to:" + readCookie("id"));
    idSuccess(readCookie("id"));
  }
}};
const sender = (file) => {
  let req = new XMLHttpRequest();
  req.upload.addEventListener("progress", updateProgress);
  req.upload.addEventListener("loadend", () => {
    console.log("done");

 
     
        idreader(0);
      
  
  });

  req.open("POST", "/upload");
  let form = new FormData();

  form.append("image", file, file.name);
  req.send(form);

  inside.style.opacity = "0";

  setTimeout(() => {
    rect.style.height = "55px";

    setTimeout(() => {
      inside.innerHTML = `    <div class='bigtext'>Uploading...</div>
    <div id='uploadbar'><div id='uploadbarinside'></div>
    `;

      console.log(bigtext);
      bigtext.style.left = "100%";
      inside.style.opacity = "1";
    }, 600);
  }, 300);
};

const idSuccess = (id) => {
  console.log(id);
  setTimeout(() => {
    setTimeout(() => {
      rect.style.height = "391px";



      inside.innerHTML = `
      <img src="/static/check.svg" id="vector" />
      <div class="bigtext2">Uploaded Succesfully!</div>
      <div id="imagebox" ></div>
    
      <div id="linkbackground">
        <div id="divinside"></div>
        <input type="button" id="buttoncopy" value="Copy Link">
      </div>
    `;
      document.getElementById('imagebox').style.backgroundImage = "url(/h/" + readCookie("id") + ")"
      document.getElementById('divinside').innerHTML = document.URL + "i/" + readCookie('id'); 

      document.getElementById('buttoncopy').addEventListener('click', ()=>{
        let copylink =  document.getElementById('divinside').innerHTML

        navigator.clipboard.writeText(copylink)
        

        
      })

      setTimeout(() => {
        inside.style.opacity = "1";
      }, 300);
    }, 601);
    inside.style.opacity = "0";
  }, 300);
};


const idNotSuccess = ()=>{
  setTimeout(() => {
    setTimeout(() => {
      rect.style.height = "57px";
      inside.innerHTML = `
      <div class="bigtext">Wrong filetype or size</div>
      <div id="smalltext">File type must be Jpeg, Png, WebP or Gif. Max filesize is 10MB</div>


    `;

      setTimeout(() => {
        inside.style.opacity = "1";
      }, 300);
    }, 601);
    inside.style.opacity = "0";

  }, 300);
}