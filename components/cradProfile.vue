.<template>
  <v-card color="blue-grey lighten-5">
    <canvas id="canvas" width="682" height="371"></canvas>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="download">
        ดาวน์โหลดนามบัตร
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import qr from 'qrcode'
export default {
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
    department: {
      type: String,
      default: () => '',
    },
  },
  data: () => ({
    lengthName: Number,
    fullpath: location.href,
    dialog: false,
    hostname: location.origin,
  }),
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      this.lengthName = this.user.personalInfo.firstnameTH.length
      const ctx = document.getElementById('canvas').getContext('2d')
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0)
        this.drawQR(ctx)
      }
      img.src = `${this.hostname}/api/avatar/3333.png`
    },
    async drawQR(ctx) {
      const qrcode = new Image()
      qrcode.onload = () => {
        console.log('draw')
        ctx.drawImage(qrcode, 530, 218)
        this.drawText(ctx)
      }
      qrcode.src = await qr.toDataURL(this.fullpath)
    },
    drawText(ctx) {
      ctx.font = '25px Kanit'
      ctx.fillStyle = '#ffffff'
      ctx.fillText(
        `${this.user.personalInfo.academicRank}${this.user.personalInfo.firstnameTH}  ${this.user.personalInfo.lastnameTH}  (${this.user.personalInfo.nicknameTH})`,
        30,
        150
      )
      ctx.font = '18px Kanit'
      ctx.fillText(`ตำแหน่ง : ${this.user.careerInfo.jobPost}`, 30, 185)
      ctx.fillText(`หน่วยงาน : ${this.department}`, 30, 215)
      ctx.fillText(`ฝ่าย : ${this.user.careerInfo.department}`, 30, 245)
      this.user.personalInfo.showPhone
        ? ctx.fillText(`เบอร์โทร : ${this.user.personalInfo.phone}`, 30, 275)
        : ctx.fillText('', 30, 275)
      ctx.fillText(`อีเมล : ${this.user.personalInfo.email}`, 30, 305)
      ctx.fillText(`FB : ${this.user.personalInfo.facebook}`, 30, 335)
      ctx.fillText(`LINE : ${this.user.personalInfo.lineID}`, 30, 365)
    },
    download() {
      const link = document.createElement('a')
      link.download = 'card.png'
      link.href = document.getElementById('canvas').toDataURL()
      link.click()
    },
  },
}
</script>

<style></style>
