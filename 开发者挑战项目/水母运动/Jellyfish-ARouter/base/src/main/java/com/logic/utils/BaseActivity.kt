package com.logic.utils

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.databinding.DataBindingUtil
import androidx.databinding.ViewDataBinding
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProviders
import com.logic.utils.ClassUtils.getViewModel

abstract class BaseActivity<VM : ViewModel, BV : ViewDataBinding>(
  private val layout: Int
) : AppCompatActivity() {

  protected lateinit var viewModel: VM
  protected lateinit var binding: BV

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    binding = DataBindingUtil.setContentView(this, layout)
    binding.lifecycleOwner = this
    viewModel = ViewModelProviders.of(this)[(getViewModel(this))]
    init()
  }

  protected fun setToolbar(toolbar: Toolbar, strId: Int) {
    setSupportActionBar(toolbar)
    toolbar.title = getString(strId)
  }

  abstract fun init()

}

