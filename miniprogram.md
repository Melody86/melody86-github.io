# <center> 小程序相关 </center>

### 1. 生命周期
小程序应用生命周期:
  
  <table>
    <th>属性
      <td>onLaunch</td>
      <td>onLaunch</td>
      <td>onLaunch</td>
      <td>onLaunch</td>
      <td>onLaunch</td>
    </th>
  </table>
  属性	类型	描述	触发时机

onLaunch	Function	生命周期函数--监听小程序初始化	当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
onShow	Function	生命周期函数--监听小程序显示	当小程序启动，或从后台进入前台显示，会触发 onShow
onHide	Function	生命周期函数--监听小程序隐藏	当小程序从前台进入后台，会触发 onHide
