package com.logic.mine

import android.content.Context
import android.text.TextUtils
import android.util.AttributeSet
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.widget.FrameLayout
import android.widget.ImageButton
import android.widget.TextView

/**
 * 设置页的选项
 */
class SettingsItem(context: Context, attrs: AttributeSet) : FrameLayout(context, attrs) {

  init {
    val typedArray = context.obtainStyledAttributes(attrs, R.styleable.SettingsItem)
    val des = typedArray.getString(R.styleable.SettingsItem_des)
    val view: View
    val textView: TextView
    if (TextUtils.isEmpty(des)) {
      // 如果没有描述(副标题)，就加载没有描述的视图
      view = LayoutInflater.from(context).inflate(R.layout.settings_item, this)
      textView = view.findViewById(R.id.title)
      // 设置text的重力
      val gravityEnd = typedArray.getBoolean(R.styleable.SettingsItem_text_gravity_end, false)
      if (gravityEnd)
        textView.gravity = Gravity.END
    } else {
      // 如果有描述，就加载有描述的视图
      view = LayoutInflater.from(context).inflate(R.layout.settings_item_with_des, this)
      textView = view.findViewById(R.id.title)
      // 如果有描述，就加载有描述的视图，并设置描述
      view.findViewById<TextView>(R.id.description).text =
        typedArray.getString(R.styleable.SettingsItem_des)
    }
    // 设置text
    textView.text = typedArray.getString(R.styleable.SettingsItem_text)
    // 设置text颜色
    val textColor = typedArray.getColor(R.styleable.SettingsItem_text_color, -10086)
    if (textColor != -10086)
      textView.setTextColor(textColor)
    // 设置icon
    val image = view.findViewById<ImageButton>(R.id.image)
    val iconSrc = typedArray.getDrawable(R.styleable.SettingsItem_icon_src)
    if (iconSrc == null)
    // 如果没有设置icon，就腾出位置
      image.visibility = View.GONE
    else
      image.setImageDrawable(iconSrc)
    typedArray.recycle()
  }

}