package com.logic.sport

import com.logic.sport.databinding.FragmentSportBinding
import com.logic.utils.BaseFragment

class SportFragment : BaseFragment<SportViewModel, FragmentSportBinding>(
  R.layout.fragment_sport
) {
  override fun init() {
    binding.viewmodel = viewModel
  }

}
