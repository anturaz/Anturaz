module.exports = function(appLink, result) {
    const message = `<td
    align="left" style="font-size:0px;padding:10px 25px;padding-top:10px;padding-right:25px;padding-bottom:10px;padding-left:25px;word-break:break-word;"
    >
    <div
       style="font-family:'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;"
       >
       Hello ` + result.data[0].fname + " " + result.data[0].lname + `!
       <div><br></div>
       <div>You have been registered as ` + result.data[0].position + ` of the Enturaz system.</div>
       <div>To verify your account, follow the instruction below:</div>
       <ol>
       <li>Click this link(it will redirect you to the account verification page): <a href="` + appLink + `Admin/VerifyAccount?email=` + result.data[0].email + `">` + appLink + `Admin/VerifyAccount</a></li>
       <li>Use the credentials below to fill up the account verification form.</li>
       </ol>
       <div style="padding-left:80px"> 
       <div><b>Email Address:</b> ` + result.data[0].email + `</div>
       <div><b>Password:</b> ` + result.data[0].password + `</div>
        </div>
       </div>
 </td>
 `
    return `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
   <head>
      <title>
      </title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
         #outlook a { padding:0; }
         .ReadMsgBody { width:100%; }
         .ExternalClass { width:100%; }
         .ExternalClass * { line-height:100%; }
         body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
         table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
         img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
         p { display:block;margin:13px 0; }
      </style>
      <style type="text/css">
         @media only screen and (max-width:480px) {
         @-ms-viewport { width:320px; }
         @viewport { width:320px; }
         }
      </style>
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" type="text/css">
      <style type="text/css">
         @import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700);
      </style>
      <style type="text/css">
         @media only screen and (min-width:480px) {
         .mj-column-per-100 { width:100% !important; max-width: 100%; }
         }
      </style>
      <style type="text/css">
         @media only screen and (max-width:480px) {
         table.full-width-mobile { width: 100% !important; }
         td.full-width-mobile { width: auto !important; }
         }
      </style>
   </head>
   <body style="background-color:#FFFFFF;">
      <div
         class="sa-body-email" style="background-color:#FFFFFF;"
         >
         <div  style="Margin:0px auto;max-width:600px;">
            <table
               align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"
               >
               <tbody>
                  <tr>
                     <td
                        style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-left:0px;padding-right:0px;padding-top:20px;text-align:center;vertical-align:top;"
                        >
                        <div
                           class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
                           >
                           <table
                              border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                              >
                              <tbody>
                                 <tr>
                                    <td  style="vertical-align:top;padding:0;">
                                       <table
                                          border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%"
                                          >
                                          <tr>
                                             <td
                                                align="center" style="background:#fca400;font-size:0px;padding:10px 25px;padding-top:10px;padding-right:25px;padding-bottom:10px;padding-left:25px;word-break:break-word;"
                                                >
                                                <table
                                                   border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"
                                                   >
                                                   <tbody>
                                                      <tr>
                                                         <td  style="width:70px;">
                                                            <img
                                                               height="auto" src="https://api-sa-email-builder.kevingermain.com/images/0344cdc8-220c-465c-84d8-5e59d4b60460/b1e41736-b3f1-410c-b169-b21f75e8ac09.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="70"
                                                               />
                                                         </td>
                                                      </tr>
                                                   </tbody>
                                                </table>
                                             </td>
                                          </tr>
                                       </table>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div  style="Margin:0px auto;max-width:600px;">
            <table
               align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"
               >
               <tbody>
                  <tr>
                     <td
                        style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-left:0px;padding-right:0px;padding-top:20px;text-align:center;vertical-align:top;"
                        >
                        <div
                           class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
                           >
                           <table
                              border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                              >
                              <tbody>
                                 <tr>
                                    <td  style="vertical-align:top;padding:0;">
                                       <table
                                          border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%"
                                          >
                                          <tr>
                                             <td
                                                align="left" style="font-size:0px;padding:10px 25px;padding-top:10px;padding-right:25px;padding-bottom:10px;padding-left:25px;word-break:break-word;"
                                                >
                                                <div
                                                   style="font-family:'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:13px;line-height:9px;text-align:left;color:#000000;"
                                                   >
                                                   <div style="text-align: center;"><span style="background-color: transparent;"><font size="6">Enturaz</font></span></div>
                                                   <h6 style="text-align: center;"><font size="3">An Event Marketplace Application</font></h6>
                                                   <div style="text-align: center;"><span style="background-color: transparent;"><font size="6"><br></font></span></div>
                                                   <div><br></div>
                                                </div>
                                             </td>
                                          </tr>
                                          <tr>
                                             ` + message + `
                                          </tr>
                                       </table>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div  style="background:#000000;background-color:#000000;Margin:0px auto;max-width:600px;">
            <table
               align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;"
               >
               <tbody>
                  <tr>
                     <td
                        style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-left:0px;padding-right:0px;padding-top:20px;text-align:center;vertical-align:top;"
                        >
                        <div
                           class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
                           >
                           <table
                              border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                              >
                              <tbody>
                                 <tr>
                                    <td  style="vertical-align:top;padding:0;">
                                       <table
                                          border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%"
                                          >
                                          <tr>
                                             <td
                                                align="left" style="font-size:0px;padding:10px 25px;padding-top:10px;padding-right:25px;padding-bottom:10px;padding-left:25px;word-break:break-word;"
                                                >
                                                <div
                                                   style="font-family:'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;"
                                                   >
                                                   <br>
                                                </div>
                                             </td>
                                          </tr>
                                       </table>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   </body>
</html>`

}