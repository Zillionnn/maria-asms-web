var Client = require('ssh2').Client
const fs = require('fs')
// const remotePath = '/usr/local/nginx/html/advt/'
const remotePath = '/work/testss'
const localPath = './dist'

function uploadFile(sftp, filePath, remote) {
  console.log(filePath, remote)

  const fileList = fs.readdirSync(filePath, { withFileTypes: true })
  for (let i = 0; i < fileList.length; i++) {
    let file = fileList[i]
    let isFile = file.isFile()
    if (isFile) {
        sftp.fastPut(`${filePath}/${file.name}`, `${remote}/${file.name}`, { concurrency: 64 }, function (err) {
          if (err) console.error('file', `${filePath}/${file.name}`,err)
        })
    

    } else {
      sftp.mkdir(remote, null, (err) => {
        if (err) console.error('mkdir', err)
        uploadFile(sftp, `${filePath}/${file.name}`, `${remote}/${file.name}`)
      })
    }
  }
}


var conn = new Client()
conn.on('ready', function () {
  console.log('Client :: ready')
  conn.sftp(function (err, sftp) {
    if (err) throw err
    uploadFile(sftp, localPath, remotePath)
  })
}).connect({
  host: '106.12.40.54',
  port: 22,
  username: 'root',
  password: '4501122z*'
})
