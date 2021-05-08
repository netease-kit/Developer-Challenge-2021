package com.logic.utils

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.databinding.ViewDataBinding
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProviders
import com.logic.utils.ClassUtils.getViewModel

abstract class BaseFragment<VM : ViewModel, SV : ViewDataBinding>(
  private val layout: Int
) : Fragment() {

  protected lateinit var viewModel: VM
  protected lateinit var binding: SV

  override fun onCreateView(
    inflater: LayoutInflater, container: ViewGroup?,
    savedInstanceState: Bundle?
  ): View? {
//    AutoSize.autoConvertDensity(requireActivity(), 640F, false)
    binding = DataBindingUtil.inflate(inflater, layout, container, false)
    binding.lifecycleOwner = viewLifecycleOwner
    viewModel = ViewModelProviders.of(this)[getViewModel(this)]
    return binding.root
  }

  override fun onActivityCreated(savedInstanceState: Bundle?) {
    super.onActivityCreated(savedInstanceState)
    init()
  }

  abstract fun init()

//  override fun isBaseOnWidth(): Boolean {
//    return false
//  }
//
//  override fun getSizeInDp(): Float {
//    return 640F
//  }
}

