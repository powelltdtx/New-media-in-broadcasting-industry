/**
 * 查询log记录action
 * @author jackicyang
 */
package com.besto.epgms.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.hssf.util.Region;
import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.besto.epgms.manage.OperationLogService;
import com.besto.epgms.po.OperationLog;

@Controller("operationLog")
@Scope("prototype")
@Lazy
public class OperationLogAction extends BaseAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private OperationLog operationLog;
	private String usernameforecxel;
	private String startDateforecxel;
	private String toDateforecxel;
	private String indexFlag;
	@Autowired
	private OperationLogService operationLogBiz;
	private Logger logger = Logger.getLogger(this.getClass());

	// 跳转到日志页
	public String tosearchPage() {
		return "index";
	}

	public String search() throws Exception {
		if ("index".equals(getIndexFlag())) {

		} else {
			logger.debug("进入OperationLogAction的search方法");
			if (null == operationLog) {
				operationLog = new OperationLog();
			}
			// 初始化分页值(保值)
			operationLog = (OperationLog) this.initPageValueAndKeepValue(operationLog, OperationLog.class);
			// 查询分页
			List<OperationLog> list = operationLogBiz.search(operationLog);
			// 结果集绑定到request 中供前台使用
			this.pageBindValue(operationLog, "list", list);
		}

		return "index";
	}

	// 导出日志
	public String exportLog() throws Exception {
		operationLog.setUsername(usernameforecxel);
		operationLog.setStartDate(startDateforecxel);
		operationLog.setToDate(toDateforecxel);
		List<OperationLog> list = new ArrayList<OperationLog>();
		list = operationLogBiz.searchLogsForExport(operationLog);
		// 服务器端生成日志excel
		/** 创建通用EXCEL头部 */
		HSSFWorkbook wb = new HSSFWorkbook();
		int countSheet;

		// 判断sheet数
		if (list.size() == 0) {
			countSheet = 1;
		} else if (list.size() % 10000 == 0) {
			countSheet = list.size() / 10000;
		} else {
			countSheet = list.size() / 10000 + 1;
		}
		logger.debug("总sheet数：" + countSheet);
		for (int count = 1; count <= countSheet; count++) {
			HSSFSheet sheet = wb.createSheet("epgms日志导出Excel_sheet(" + count + ")");
			sheet.setColumnWidth(0, (short) 5000);
			sheet.setColumnWidth(1, (short) 5000);
			sheet.setColumnWidth(2, (short) 5000);
			sheet.setColumnWidth(3, (short) 5000);
			sheet.setColumnWidth(4, (short) 5000);
			HSSFRow row = sheet.createRow(0);
			// 设置第一行
			HSSFCell cell = row.createCell(0);
			row.setHeight((short) 400);
			// 定义单元格为字符串类型
			cell.setCellType(HSSFCell.ENCODING_UTF_16);
			cell.setCellValue(new HSSFRichTextString("epgms日志导出表"));
			// 指定合并区域
			sheet.addMergedRegion(new Region(0, (short) 0, 0, (short) 4));
			HSSFCellStyle cellStyle1 = wb.createCellStyle();

			cellStyle1.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 指定单元格居中对齐
			cellStyle1.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 指定单元格垂直居中对齐
			cellStyle1.setWrapText(true);// 指定单元格自动换行
			// 设置单元格字体
			HSSFFont font = wb.createFont();
			font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
			font.setFontName("宋体");
			font.setFontHeight((short) 300);
			cellStyle1.setFont(font);
			cell.setCellStyle(cellStyle1);
			/** 创建通用报表第二行 */
			HSSFRow row1 = sheet.createRow(1);
			row1.setHeight((short) 300);
			HSSFCell cell2 = row1.createCell(0);
			cell2.setCellType(HSSFCell.ENCODING_UTF_16);
			String excelstartDate;
			String exceltoDate;
			if (null == operationLog.getStartDate() || operationLog.getStartDate().equals("")) {
				excelstartDate = "~";
			} else {
				excelstartDate = operationLog.getStartDate();
			}
			if (null == operationLog.getToDate() || operationLog.getToDate().equals("")) {
				DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
				exceltoDate = df.format(new Date());
			} else {
				exceltoDate = operationLog.getToDate();
			}
			cell2.setCellValue(new HSSFRichTextString(
					"用户：" + operationLog.getUsername() + "          " + "统计时间：" + excelstartDate + "至" + exceltoDate));
			// 指定合并区域
			sheet.addMergedRegion(new Region(1, (short) 0, 1, (short) 4));

			HSSFCellStyle cellStyle2 = wb.createCellStyle();
			cellStyle2.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 指定单元格居中对齐
			cellStyle2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 指定单元格垂直居中对齐
			cellStyle2.setWrapText(true);// 指定单元格自动换行

			// 设置单元格字体
			HSSFFont font2 = wb.createFont();
			font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
			font.setFontName("宋体");
			font.setFontHeight((short) 250);
			cellStyle2.setFont(font2);

			cell2.setCellStyle(cellStyle2);
			/** 创建通用报表第三行 */
			// 设置列头
			HSSFRow row2 = sheet.createRow(2);

			// 指定行高
			row2.setHeight((short) 600);

			HSSFCellStyle cellStyle3 = wb.createCellStyle();
			cellStyle3.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 指定单元格居中对齐
			cellStyle3.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 指定单元格垂直居中对齐
			cellStyle3.setWrapText(true);// 指定单元格自动换行
			// 单元格字体
			HSSFFont font3 = wb.createFont();
			font3.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
			font3.setFontName("宋体");
			font3.setFontHeight((short) 250);
			cellStyle3.setFont(font3);

			// 设置单元格背景色
			cellStyle3.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);
			cellStyle3.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);

			HSSFCell cell3 = null;
			String[] columHeader = { "序号", "用户名", "操作类型", "时间", "操作详细" };
			for (int i = 0; i < columHeader.length; i++) {
				cell3 = row2.createCell(i);
				cell3.setCellType(HSSFCell.ENCODING_UTF_16);
				cell3.setCellStyle(cellStyle3);
				cell3.setCellValue(new HSSFRichTextString(columHeader[i]));
			}
			/** 创建通用报表主体 */
			// 创建样式
			HSSFCellStyle cellstyle4 = wb.createCellStyle();
			cellstyle4.setAlignment(HSSFCellStyle.VERTICAL_CENTER);
			cellstyle4.setWrapText(true);// 设置自动换行
			// 判断当前sheet需要导出行数
			int rowCount;
			if (count < countSheet) {
				rowCount = 10000;
			} else {
				rowCount = list.size() - (countSheet - 1) * 10000;
			}
			logger.debug("创建第" + count + "个sheet:" + rowCount + "行");
			for (int i = 0; i < rowCount; i++) {
				HSSFRow row4 = sheet.createRow((short) i + 3);
				// 创建列

				HSSFCell row4_cell0 = row4.createCell(0);
				row4_cell0.setCellType(HSSFCell.ENCODING_UTF_16);
				row4_cell0.setCellValue(new HSSFRichTextString((i + 1) + ""));
				row4_cell0.setCellStyle(cellstyle4);

				HSSFCell row4_cell1 = row4.createCell(1);
				row4_cell1.setCellType(HSSFCell.ENCODING_UTF_16);
				row4_cell1.setCellValue(new HSSFRichTextString(list.get(i + (count - 1) * 10000).getUsername()));
				row4_cell1.setCellStyle(cellstyle4);

				HSSFCell row4_cell2 = row4.createCell(2);
				row4_cell2.setCellType(HSSFCell.ENCODING_UTF_16);
				row4_cell2.setCellValue(new HSSFRichTextString(list.get(i + (count - 1) * 10000).getModuleName()));
				row4_cell2.setCellStyle(cellstyle4);

				HSSFCell row4_cell3 = row4.createCell(3);
				row4_cell3.setCellType(HSSFCell.ENCODING_UTF_16);
				row4_cell3.setCellValue(new HSSFRichTextString(list.get(i + (count - 1) * 10000).getDate()));
				row4_cell3.setCellStyle(cellstyle4);

				HSSFCell row4_cell5 = row4.createCell(4);
				row4_cell5.setCellType(HSSFCell.ENCODING_UTF_16);
				row4_cell5.setCellValue(new HSSFRichTextString("在 " + list.get(i + (count - 1) * 10000).getTime()
						+ " 对 " + list.get(i + (count - 1) * 10000).getModuleDesc() + " 执行 "
						+ list.get(i + (count - 1) * 10000).getOptdesc() + " 动作"));
				row4_cell5.setCellStyle(cellstyle4);
			}
		}
		/** 输入EXCEL文件 */
		// 保存到服务器临时路径
		String path = ServletActionContext.getServletContext().getRealPath("/");
		OutputStream fos = null;
		try {
			fos = new FileOutputStream(new File(path + "WEB-INF/exceltemp/exportExcel.xls"));
			wb.write(fos);
			fos.close();
		} catch (Exception e) {
			e.getMessage();
		}
		// 下载
		HttpServletResponse response = ServletActionContext.getResponse();
		response.reset();
		response.setContentType("application/x-xls");
		response.addHeader("Content-Disposition", "attachment; filename=\"exportExcel.xls\"");
		File file = new File(path + "WEB-INF/exceltemp/exportExcel.xls");
		int fileLength = (int) file.length();
		response.setContentLength(fileLength);
		/* 如果文件长度大于0 */
		if (fileLength != 0) {
			/* 创建输入流 */
			InputStream inStream = new FileInputStream(file);
			byte[] buf = new byte[4096];
			/* 创建输出流 */
			ServletOutputStream servletOS = response.getOutputStream();
			int readLength;
			while (((readLength = inStream.read(buf)) != -1)) {
				servletOS.write(buf, 0, readLength);
			}
			inStream.close();
			servletOS.flush();
			servletOS.close();
		}
		return null;
	}

	// set he get
	public OperationLog getOperationLog() {
		return operationLog;
	}

	public void setOperationLog(OperationLog operationLog) {
		this.operationLog = operationLog;
	}

	/**
	 * @return the usernameforecxel
	 */
	public String getUsernameforecxel() {
		return usernameforecxel;
	}

	/**
	 * @param usernameforecxel
	 *            the usernameforecxel to set
	 */
	public void setUsernameforecxel(String usernameforecxel) {
		this.usernameforecxel = usernameforecxel;
	}

	/**
	 * @return the startDateforecxel
	 */
	public String getStartDateforecxel() {
		return startDateforecxel;
	}

	/**
	 * @param startDateforecxel
	 *            the startDateforecxel to set
	 */
	public void setStartDateforecxel(String startDateforecxel) {
		this.startDateforecxel = startDateforecxel;
	}

	/**
	 * @return the toDateforecxel
	 */
	public String getToDateforecxel() {
		return toDateforecxel;
	}

	/**
	 * @param toDateforecxel
	 *            the toDateforecxel to set
	 */
	public void setToDateforecxel(String toDateforecxel) {
		this.toDateforecxel = toDateforecxel;
	}

	public String getIndexFlag() {
		return indexFlag;
	}

	public void setIndexFlag(String indexFlag) {
		this.indexFlag = indexFlag;
	}
}
