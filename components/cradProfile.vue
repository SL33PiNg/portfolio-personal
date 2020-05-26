.<template>
  <v-card color="blue-grey lighten-5">
    <canvas id="canvas" width="691" height="389"></canvas>
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
  },
  data: () => ({
    fullpath: location.href,
    dialog: false,
    hostname: location.origin,
  }),
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      const ctx = document.getElementById('canvas').getContext('2d')
      const img = new Image()
      img.onload = () => {
        // const ptrn = ctx.createPattern(img, 'repeat')
        // ctx.fillStyle = ptrn
        // ctx.fillRect(0, 0, 691, 389)
        ctx.drawImage(img, 0, 0)
        this.drawQR(ctx)
      }
      img.src = `${this.hostname}/api/avatar/3333.png`
    },
    async drawQR(ctx) {
      const qrcode = new Image()
      qrcode.onload = () => {
        console.log('draw')
        ctx.drawImage(qrcode, 520, 220)
        this.drawText(ctx)
      }
      qrcode.src = await qr.toDataURL(this.fullpath)
    },
    drawText(ctx) {
      ctx.font = '36px TH Sarabun New'
      ctx.fillStyle = '#ffffff'
      ctx.fillText(this.user.personalInfo.academicRank, 30, 150)
      ctx.fillText(this.user.personalInfo.firstnameTH, 165, 150)
      ctx.fillText(this.user.personalInfo.lastnameTH, 300, 150)
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
