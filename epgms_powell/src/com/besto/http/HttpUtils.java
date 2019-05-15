package com.besto.http;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;

public class HttpUtils {

	// httpclient访问bytueguard获取比对字符
	public static String getHttpClientInfo(String url, String timeCode,String uuidKey) {
		String ret = "";
		long temp = System.currentTimeMillis();
		HttpClient httpclient = new HttpClient();
		httpclient.getHttpConnectionManager().getParams()
				.setConnectionTimeout(10000);
		httpclient.getHttpConnectionManager().getParams()
				.setSoTimeout(10000);
		PostMethod method = new PostMethod(url);
		try {
			NameValuePair[] param = { new NameValuePair("timeCode", timeCode),
					new NameValuePair("uuidKey", uuidKey) };
			method.setRequestBody(param);
			method.getParams().setParameter(
					HttpMethodParams.HTTP_CONTENT_CHARSET, "UTF-8");
			int executeMethod = httpclient.executeMethod(method);
			System.out.println("-----executeMethod----"+executeMethod);
			ret = new String(method.getResponseBodyAsString());
			// System.out.println("==================================="+ret);
			if (method.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
			}
		} catch (Exception e) {
			ret = "bytueguard已离线";
		} finally{
			method.releaseConnection();
			System.out.println("http连接已关闭:"+ method.toString());
		}
		return ret;
	}

	// 调用absm,发布广告信息,重新生成js数据文件
	public static String saveAdresourceByHttpClient(String url,
			String adresourceJson) {
		String result = "";
		try {
			HttpClient httpclient = new HttpClient();
			httpclient.getHttpConnectionManager().getParams()
					.setConnectionTimeout(10000);
			httpclient.getHttpConnectionManager().getParams()
					.setSoTimeout(10000);
			PostMethod method = new PostMethod(url);
			NameValuePair[] param = { new NameValuePair("adresourceJson",
					adresourceJson), };
			method.setRequestBody(param);
			method.getParams().setParameter(
					HttpMethodParams.HTTP_CONTENT_CHARSET, "UTF-8");
			httpclient.executeMethod(method);
			result = new String(method.getResponseBodyAsString());
			// System.out.println("==================================="+ret);
			if (method.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
			}
			method.releaseConnection();
		} catch (Exception e) {
			e.printStackTrace();
			result = "";
		}
		return result;
	}

}
